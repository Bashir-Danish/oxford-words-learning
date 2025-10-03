import React, { useState } from 'react';
import { detectWordsInSentence, countWords, validateSentence, getPOSColor } from '../utils/helpers';

const SentenceInput = ({ sentence, onSentenceChange, family, onCheck }) => {
  const [isChecking, setIsChecking] = useState(false);

  const detected = detectWordsInSentence(sentence, family);
  const wordCount = countWords(sentence);

  const handleCheck = () => {
    setIsChecking(true);
    const result = validateSentence(sentence, family);
    onCheck(result);
    setTimeout(() => setIsChecking(false), 500);
  };

  return (
    <div className="sentence-input-section">
      <div className="section-header">
        <h3>✍️ Write ONE sentence using as many forms as possible</h3>
        <div className="word-counter">
          Words: <strong>{wordCount}</strong>
        </div>
      </div>

      <textarea
        className="sentence-textarea"
        value={sentence}
        onChange={(e) => onSentenceChange(e.target.value)}
        placeholder="Type your sentence here... (e.g., 'I decided to make a decisive decision.')"
        rows="4"
      />

      {/* Forms Used Indicators */}
      <div className="forms-used">
        <div className="forms-used-title">Forms Used ({detected.count}):</div>
        <div className="forms-used-list">
          {family.forms.map((form, index) => {
            const isUsed = detected.words.some(w => w.word.toLowerCase() === form.word.toLowerCase());
            return (
              <div
                key={index}
                className={`form-indicator ${isUsed ? 'used' : 'unused'} ${getPOSColor(form.pos)}`}
              >
                {isUsed && '✓ '}
                {form.word}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className={`btn btn-lg btn-primary check-button ${isChecking ? 'checking' : ''}`}
        onClick={handleCheck}
        disabled={!sentence.trim() || isChecking}
      >
        {isChecking ? '⏳ Checking...' : '✔️ Check My Sentence'}
      </button>
    </div>
  );
};

export default SentenceInput;
