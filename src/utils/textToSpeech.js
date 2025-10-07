/**
 * Text-to-Speech Utility with improved pronunciation
 * Uses enhanced Web Speech API with better voice selection
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
    this.currentUtterance = null;
    this.loadVoices();
    
    // Load voices when they change (some browsers load them async)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  /**
   * Get the best English voice available
   * Prefers high-quality voices with better pronunciation
   */
  getEnglishVoice() {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    // Priority list of high-quality voices
    const preferredVoices = [
      'Google UK English Female',
      'Google UK English Male',
      'Google US English',
      'Microsoft Zira - English (United States)',
      'Microsoft David - English (United States)',
      'Alex',  // macOS
      'Samantha',  // macOS
      'Karen',  // macOS
      'Daniel',  // macOS
    ];

    // Try to find preferred voices first
    for (const prefName of preferredVoices) {
      const voice = this.voices.find(v => v.name.includes(prefName));
      if (voice) return voice;
    }

    // Try to find any high-quality English voice
    const highQualityVoice = this.voices.find(v => 
      (v.lang === 'en-GB' || v.lang === 'en-US') && 
      (v.name.toLowerCase().includes('google') || 
       v.name.toLowerCase().includes('microsoft') ||
       v.localService === false)  // Network voices are usually better quality
    );
    
    if (highQualityVoice) return highQualityVoice;

    // Fallback to any English voice
    let voice = this.voices.find(v => v.lang === 'en-GB') ||
                this.voices.find(v => v.lang === 'en-US') ||
                this.voices.find(v => v.lang.startsWith('en-'));
    
    // Last resort: use the first available voice
    return voice || this.voices[0];
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
      '(n)': ' noun',
      '(v)': ' verb',
      '(adj)': ' adjective',
      '(adv)': ' adverb',
      '(prep)': ' preposition',
      '(pron)': ' pronoun',
      '(conj)': ' conjunction',
      '(interj)': ' interjection',
      '(det)': ' determiner',
      '(aux)': ' auxiliary verb',
      '(modal)': ' modal verb',
      
      // Common patterns
      '(sb)': ' somebody',
      '(sth)': ' something',
      '(pl)': ' plural',
      '(sing)': ' singular',
      '(C)': ' countable',
      '(U)': ' uncountable',
      '(T)': ' transitive',
      '(I)': ' intransitive',
      
      // Common word notations
      'sb.': ' somebody',
      'sth.': ' something',
      'e.g.': ' for example',
      'i.e.': ' that is',
      'etc.': ' etcetera',
      'vs.': ' versus',
      'approx.': ' approximately',
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

  /**
   * Speak a word or sentence
   * @param {string} text - Text to speak
   * @param {Object} options - Speech options
   */
  speak(text, options = {}) {
    // Check if speech synthesis is available
    if (!this.synth || !text) return;
    
    // Cancel any ongoing speech first
    this.synth.cancel();
    
    // Small delay to ensure cancel completes (helps with some browsers)
    setTimeout(() => {
      // iOS Safari fix: Resume synthesis (it sometimes gets paused)
      if (this.synth.paused) {
        this.synth.resume();
      }

      // Expand abbreviations for better pronunciation
      const expandedText = this.expandAbbreviations(text);

      const utterance = new SpeechSynthesisUtterance(expandedText);
      this.currentUtterance = utterance;
      
      // Set voice - Try to get it fresh each time for reliability
      this.loadVoices();
      const voice = this.getEnglishVoice();
      if (voice) {
        utterance.voice = voice;
        console.log('Using voice:', voice.name, '- Lang:', voice.lang);
      }

      // Set options with defaults optimized for learning
      // Slower rate for better comprehension
      const defaultRate = this.isMobile ? 0.8 : 0.85;
      utterance.rate = options.rate || defaultRate;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.lang = options.lang || 'en-GB';  // UK English for better pronunciation

      // Callbacks
      if (options.onStart) utterance.onstart = options.onStart;
      if (options.onEnd) utterance.onend = options.onEnd;
      if (options.onError) {
        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          options.onError(event);
        };
      }

      // Speak the text
      this.synth.speak(utterance);
    }, 50);
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
