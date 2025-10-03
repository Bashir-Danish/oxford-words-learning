import React, { useState } from 'react';
import { saveToLocalStorage } from '../utils/helpers';

const DataImport = ({ onDataImported }) => {
  const [importData, setImportData] = useState('');
  const [importFormat, setImportFormat] = useState('simple');
  const [result, setResult] = useState(null);
  const [unitCount, setUnitCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Parse simple format
  const parseSimpleFormat = (text) => {
    const units = [];
    const lines = text.trim().split('\n');
    let currentUnit = null;
    let wordCount = 0;

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.startsWith('=')) continue; // Skip separator lines
      if (line.startsWith('OXFORD')) continue; // Skip headers
      if (line.startsWith('Instructions')) continue; // Skip instructions
      if (line.startsWith('HOW TO')) continue; // Skip how-to
      if (line.toLowerCase().includes('template')) continue; // Skip template markers

      // Check if it's a unit header (starts with number)
      const unitMatch = line.match(/^(\d+)\.\s*(.+)$/);
      if (unitMatch) {
        if (currentUnit) {
          units.push(currentUnit);
        }
        currentUnit = {
          unitNumber: parseInt(unitMatch[1]),
          title: unitMatch[2],
          vocabulary: []
        };
        continue;
      }

      // Otherwise, it's a word
      // Enhanced format: word | pos | level | definition | family | synonym | opposite | example | persian
      // Old format: word | pos | definition | example | related
      if (currentUnit && line && line.includes('|')) {
        const parts = line.split('|').map(p => p.trim());
        
        // Determine format based on number of parts
        let word;
        if (parts.length >= 9) {
          // Enhanced format with Persian
          word = {
            word: parts[0] || '',
            pos: parts[1] || 'noun',
            level: parts[2] || 'A1',
            definition: parts[3] || '',
            family: parts[4] || '',
            synonyms: parts[5] ? parts[5].split(',').map(w => w.trim()) : [],
            opposites: parts[6] ? parts[6].split(',').map(w => w.trim()) : [],
            example: parts[7] || '',
            persian: parts[8] || '',
            relatedWords: parts[4] ? parts[4].split(',').map(w => w.trim()) : []
          };
        } else {
          // Old simple format
          word = {
            word: parts[0] || '',
            pos: parts[1] || 'noun',
            definition: parts[2] || '',
            example: parts[3] || '',
            relatedWords: parts[4] ? parts[4].split(',').map(w => w.trim()) : [],
            family: '',
            synonyms: [],
            opposites: [],
            persian: '',
            level: 'A1'
          };
        }
        
        currentUnit.vocabulary.push(word);
        wordCount++;
      }
    }

    if (currentUnit) {
      units.push(currentUnit);
    }

    return { units, wordCount };
  };

  // Parse CSV format
  const parseCSVFormat = (text) => {
    const lines = text.trim().split('\n');
    const units = new Map();
    let wordCount = 0;

    // Skip header if present
    const startIndex = lines[0].includes('unitNumber') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''));
      const unitNumber = parseInt(parts[0]);
      
      if (!units.has(unitNumber)) {
        units.set(unitNumber, {
          unitNumber: unitNumber,
          title: parts[1] || `Unit ${unitNumber}`,
          vocabulary: []
        });
      }

      const word = {
        word: parts[2] || '',
        pos: parts[3] || 'noun',
        definition: parts[4] || '',
        example: parts[5] || '',
        relatedWords: parts[6] ? parts[6].split(';').map(w => w.trim()) : []
      };

      units.get(unitNumber).vocabulary.push(word);
      wordCount++;
    }

    return { units: Array.from(units.values()), wordCount };
  };

  // Handle import
  const handleImport = () => {
    try {
      let parsed;
      
      if (importFormat === 'simple') {
        parsed = parseSimpleFormat(importData);
      } else if (importFormat === 'csv') {
        parsed = parseCSVFormat(importData);
      }

      // Save to localStorage
      const existingUnits = JSON.parse(localStorage.getItem('oxfordUnits') || '[]');
      
      // Merge with existing units (replace if same unit number)
      const unitMap = new Map(existingUnits.map(u => [u.unitNumber, u]));
      parsed.units.forEach(unit => {
        unitMap.set(unit.unitNumber, unit);
      });
      
      const allUnits = Array.from(unitMap.values()).sort((a, b) => a.unitNumber - b.unitNumber);
      
      localStorage.setItem('oxfordUnits', JSON.stringify(allUnits));
      
      setResult({
        success: true,
        message: `Successfully imported ${parsed.units.length} units with ${parsed.wordCount} words!`,
        units: parsed.units
      });
      
      setUnitCount(allUnits.length);
      setWordCount(parsed.wordCount);
      
      // Notify parent component about data change
      if (onDataImported) {
        onDataImported();
      }
      
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  };

  // Export current data
  const handleExport = () => {
    const units = JSON.parse(localStorage.getItem('oxfordUnits') || '[]');
    const json = JSON.stringify(units, null, 2);
    
    // Download as file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oxford-units-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate JavaScript file code
  const generateJSFile = () => {
    const units = JSON.parse(localStorage.getItem('oxfordUnits') || '[]');
    
    let jsCode = `// Oxford Word Skills Elementary - Generated Data\n`;
    jsCode += `// Generated on: ${new Date().toLocaleString()}\n`;
    jsCode += `// Total Units: ${units.length}\n\n`;
    jsCode += `export const oxfordUnits = ${JSON.stringify(units, null, 2)};\n\n`;
    jsCode += `export const getUnitByNumber = (unitNumber) => {\n`;
    jsCode += `  return oxfordUnits.find(u => u.unitNumber === unitNumber);\n`;
    jsCode += `};\n\n`;
    jsCode += `export const getAllUnits = () => oxfordUnits;\n`;
    
    // Download as file
    const blob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oxfordUnitsData.js`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('JavaScript file generated! Save it to src/data/oxfordUnitsData.js');
  };

  // Clear all data
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all imported data?')) {
      localStorage.removeItem('oxfordUnits');
      setUnitCount(0);
      setWordCount(0);
      setResult({ success: true, message: 'All data cleared!' });
    }
  };

  // Load current stats on mount
  React.useEffect(() => {
    const units = JSON.parse(localStorage.getItem('oxfordUnits') || '[]');
    setUnitCount(units.length);
    const words = units.reduce((sum, u) => sum + u.vocabulary.length, 0);
    setWordCount(words);
  }, [result]);

  return (
    <div className="data-import">
      <div className="import-header">
        <h2>📥 Import Oxford Word Skills Data</h2>
        <p>Easy way to add vocabulary from your Oxford Word Skills Elementary book</p>
      </div>

      {/* Current Stats */}
      <div className="import-stats">
        <div className="stat-box">
          <div className="stat-number">{unitCount}</div>
          <div className="stat-label">Units Imported</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{wordCount}</div>
          <div className="stat-label">Total Words</div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="format-selection">
        <h3>Choose Import Format:</h3>
        <div className="format-options">
          <label className={importFormat === 'simple' ? 'selected' : ''}>
            <input
              type="radio"
              value="simple"
              checked={importFormat === 'simple'}
              onChange={(e) => setImportFormat(e.target.value)}
            />
            <div>
              <strong>Simple Format</strong>
              <small>Easiest - Line by line</small>
            </div>
          </label>
          
          <label className={importFormat === 'csv' ? 'selected' : ''}>
            <input
              type="radio"
              value="csv"
              checked={importFormat === 'csv'}
              onChange={(e) => setImportFormat(e.target.value)}
            />
            <div>
              <strong>CSV Format</strong>
              <small>From spreadsheet</small>
            </div>
          </label>
        </div>
      </div>

      {/* Format Instructions */}
      <div className="format-instructions">
        <h3>📝 Format Instructions:</h3>
        
        {importFormat === 'simple' && (
          <div className="instruction-box">
            <h4>Simple Format (Recommended)</h4>
            <p><strong>ENHANCED FORMAT (with Persian):</strong></p>
            <pre>{`word | pos | level | definition | family | synonym | opposite | example | persian

Example:
happy | adjective | A1 | feeling joy | happiness(n), happily(adv), unhappy(adj) | joyful, glad | sad, unhappy | I am happy today. | خوشحال
ability | noun | A2 | skill to do | able(adj), enable(v) | skill, talent | inability | She has ability. | توانایی`}</pre>
            <p><strong>OLD FORMAT (still works):</strong></p>
            <pre>{`1. Classroom vocabulary
board | noun | a flat surface to write on | The teacher wrote on the board. | whiteboard, blackboard
desk | noun | a table for writing | Students sit at their desks. | table`}</pre>
            <p><strong>Fields:</strong> word | pos | level | definition | family | synonyms | opposites | example | persian</p>
          </div>
        )}

        {importFormat === 'csv' && (
          <div className="instruction-box">
            <h4>CSV Format (For Spreadsheets)</h4>
            <p>Create a CSV file with these columns:</p>
            <pre>{`unitNumber,unitTitle,word,pos,definition,example,relatedWords
1,Classroom vocabulary,board,noun,a flat surface to write on,The teacher wrote on the board.,whiteboard;blackboard
1,Classroom vocabulary,desk,noun,a table for writing,Students sit at their desks.,table
2,Grammar words,verb,noun,action word,Run is a verb.,action`}</pre>
            <p><strong>Note:</strong> Related words separated by semicolon (;)</p>
          </div>
        )}
      </div>

      {/* Import Area */}
      <div className="import-area">
        <h3>Paste Your Data Here:</h3>
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          placeholder={
            importFormat === 'simple'
              ? "1. Unit Title\nword | pos | definition | example | related\n\n2. Next Unit\n..."
              : "unitNumber,unitTitle,word,pos,definition,example,relatedWords\n1,Title,word,noun,def,example,related"
          }
          rows={15}
        />
      </div>

      {/* Action Buttons */}
      <div className="import-actions">
        <button className="btn btn-primary btn-lg" onClick={handleImport}>
          📥 Import Data
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          💾 Export JSON
        </button>
        <button className="btn btn-success" onClick={generateJSFile}>
          📄 Generate JS File
        </button>
        <button className="btn btn-danger" onClick={handleClearData}>
          🗑️ Clear All Data
        </button>
      </div>

      {/* Result Message */}
      {result && (
        <div className={`result-message ${result.success ? 'success' : 'error'}`}>
          <p>{result.message}</p>
          {result.success && result.units && (
            <div className="imported-units">
              <h4>Imported Units:</h4>
              <ul>
                {result.units.map(unit => (
                  <li key={unit.unitNumber}>
                    Unit {unit.unitNumber}: {unit.title} ({unit.vocabulary.length} words)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Example Data */}
      <div className="example-section">
        <h3>🎯 Quick Start Example</h3>
        <p>Copy and paste this example to test:</p>
        <button 
          className="btn btn-sm btn-info"
          onClick={() => setImportData(`1. Classroom vocabulary
board | noun | a flat surface for writing | The teacher wrote on the board. | whiteboard, blackboard
desk | noun | a table for writing | Students sit at their desks. | table, workspace
pen | noun | writing instrument | I write with a pen. | pencil, marker
book | noun | written work | Read the book. | textbook, notebook

2. Grammar words
verb | noun | action word | Run is a verb. | action
noun | noun | name of thing | Dog is a noun. | name
adjective | noun | describing word | Happy is an adjective. | descriptor`)}
        >
          Load Example Data
        </button>
      </div>

      <style jsx>{`
        .data-import {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .import-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .import-header h2 {
          margin-bottom: 10px;
          color: #2c3e50;
        }

        .import-stats {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .stat-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px 40px;
          border-radius: 10px;
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: bold;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .format-selection {
          margin-bottom: 30px;
        }

        .format-options {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .format-options label {
          flex: 1;
          border: 2px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .format-options label:hover {
          border-color: #667eea;
        }

        .format-options label.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .format-options input[type="radio"] {
          margin-right: 10px;
        }

        .format-instructions {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .instruction-box {
          margin-top: 10px;
        }

        .instruction-box pre {
          background: white;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 12px;
          border: 1px solid #ddd;
        }

        .import-area textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          resize: vertical;
        }

        .import-actions {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .result-message {
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .result-message.success {
          background: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
        }

        .result-message.error {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .imported-units {
          margin-top: 10px;
        }

        .imported-units ul {
          list-style: none;
          padding: 0;
        }

        .imported-units li {
          padding: 5px 0;
          border-bottom: 1px solid #ddd;
        }

        .example-section {
          background: #fff3cd;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-primary {
          background: #667eea;
          color: white;
        }

        .btn-primary:hover {
          background: #5568d3;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-success {
          background: #28a745;
          color: white;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .btn-info {
          background: #17a2b8;
          color: white;
        }

        .btn-lg {
          padding: 15px 30px;
          font-size: 16px;
        }

        .btn-sm {
          padding: 8px 15px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export default DataImport;
