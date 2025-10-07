/**
 * Text-to-Speech Utility using Web Speech API
 * No external packages needed - built into modern browsers!
 */

class TextToSpeech {
  constructor() {
    // Check if running in browser environment
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      this.synth = null;
      this.voices = [];
      return;
    }
    
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    this.loadVoices();
    
    // Load voices when they change (some browsers load them async)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  /**
   * Expand common abbreviations for text-to-speech
   * @param {string} text - Text with possible abbreviations
   * @returns {string} Text with expanded abbreviations
   */
  expandAbbreviations(text) {
    if (!text) return text;
    
    const abbreviations = {
      // Parts of speech
      '(n)': 'noun',
      '(v)': 'verb',
      '(adj)': 'adjective',
      '(adv)': 'adverb',
      '(prep)': 'preposition',
      '(pron)': 'pronoun',
      '(conj)': 'conjunction',
      '(interj)': 'interjection',
      '(det)': 'determiner',
      '(aux)': 'auxiliary verb',
      '(modal)': 'modal verb',
      
      // Common patterns
      '(sb)': 'somebody',
      '(sth)': 'something',
      '(pl)': 'plural',
      '(sing)': 'singular',
      '(C)': 'countable',
      '(U)': 'uncountable',
      '(T)': 'transitive',
      '(I)': 'intransitive',
      
      // Common word notations
      'sb.': 'somebody',
      'sth.': 'something',
      'e.g.': 'for example',
      'i.e.': 'that is',
      'etc.': 'etcetera',
      'vs.': 'versus',
      'approx.': 'approximately',
    };
    
    let expandedText = text;
    
    // Replace each abbreviation
    Object.keys(abbreviations).forEach(abbr => {
      // Use regex with word boundaries for more precise matching
      const regex = new RegExp(abbr.replace(/[()]/g, '\\$&'), 'gi');
      expandedText = expandedText.replace(regex, abbreviations[abbr]);
    });
    
    return expandedText;
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  /**
   * Get the best English voice available
   * Prefers US or UK English voices
   */
  getEnglishVoice() {
    // Try to find specific English voices (US or UK)
    let voice = this.voices.find(v => v.lang === 'en-US') ||
                this.voices.find(v => v.lang === 'en-GB') ||
                this.voices.find(v => v.lang.startsWith('en-'));
    
    // Fallback to any voice
    return voice || this.voices[0];
  }

  /**
   * Speak a word or sentence
   * @param {string} text - Text to speak
   * @param {Object} options - Speech options
   */
  speak(text, options = {}) {
    // Check if speech synthesis is available
    if (!this.synth || !text) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    // iOS Safari fix: Resume synthesis (it sometimes gets paused)
    if (this.synth.paused) {
      this.synth.resume();
    }

    // Expand abbreviations for better pronunciation
    const expandedText = this.expandAbbreviations(text);

    const utterance = new SpeechSynthesisUtterance(expandedText);
    
    // Set voice
    const voice = this.getEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Set options with defaults
    // Mobile devices (especially Android) work better with slightly different rates
    const defaultRate = this.isMobile ? 0.85 : 0.9;
    utterance.rate = options.rate || defaultRate; // Slightly slower for learning
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'en-US';

    // Callbacks
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    this.synth.speak(utterance);
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Check if speech synthesis is supported
   */
  isSupported() {
    return 'speechSynthesis' in window;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

// Create singleton instance
const textToSpeech = new TextToSpeech();

export default textToSpeech;
