import React from 'react';
import { highlightWordsInSentence, getPOSColor } from '../utils/helpers';

const ExampleSentences = ({ family, onClose }) => {
  if (!family || !family.exampleSentences) return null;

  const renderHighlightedSentence = (sentence) => {
    const segments = highlightWordsInSentence(sentence, family);
    
    return (
      <span>
        {segments.map((segment, index) => (
          segment.highlighted ? (
            <mark 
              key={index}
              className={`highlight-${getPOSColor(segment.pos)}`}
              title={segment.pos}
            >
              {segment.text}
            </mark>
          ) : (
            <span key={index}>{segment.text}</span>
          )
        ))}
      </span>
    );
  };

  return (
    <div className="example-sentences-section">
      <div className="section-header">
        <h3>📖 Example Sentences</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="examples-content">
        <p className="examples-intro">
          See how professionals use the <strong>{family.baseWord}</strong> word family in real contexts:
        </p>

        <div className="examples-list">
          {family.exampleSentences.map((example, index) => (
            <div key={index} className="example-item">
              <div className="example-text">
                {renderHighlightedSentence(example.text)}
              </div>
              <div className="example-source">— {example.source}</div>
            </div>
          ))}
        </div>

        <div className="examples-note">
          💡 <em>Try to create sentences similar to these examples!</em>
        </div>
      </div>
    </div>
  );
};

export default ExampleSentences;
