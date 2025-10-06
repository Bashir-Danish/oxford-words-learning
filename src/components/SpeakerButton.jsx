import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import textToSpeech from '../utils/textToSpeech';

/**
 * SpeakerButton - Button to pronounce a word using text-to-speech
 * @param {string} text - Text to pronounce
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {string} variant - Button style: 'primary', 'secondary', 'minimal'
 * @param {boolean} autoSpeak - Auto-speak when text changes
 */
const SpeakerButton = ({ 
  text, 
  size = 'md', 
  variant = 'primary',
  autoSpeak = false,
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(textToSpeech.isSupported());

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-300',
    minimal: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800'
  };

  const handleSpeak = () => {
    if (!text || !isSupported) return;

    try {
      if (isSpeaking) {
        textToSpeech.stop();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        textToSpeech.speak(text, {
          onEnd: () => setIsSpeaking(false),
          onError: (err) => {
            console.error('Speech error:', err);
            setIsSpeaking(false);
          },
        });
      }
    } catch (error) {
      console.error('handleSpeak error:', error);
      setIsSpeaking(false);
    }
  };

  // Auto-speak when text changes (if enabled)
  useEffect(() => {
    if (autoSpeak && text && isSupported) {
      handleSpeak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoSpeak]);

  if (!isSupported) {
    return (
      <button
        disabled
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-gray-200 text-gray-400 cursor-not-allowed ${className}`}
        title="Text-to-speech not supported in this browser"
      >
        <VolumeX className={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={handleSpeak}
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${className}`}
      title={isSpeaking ? 'Stop pronunciation' : `Pronounce: ${text}`}
      aria-label={isSpeaking ? 'Stop pronunciation' : `Pronounce ${text}`}
    >
      <Volume2 
        className={`${iconSizes[size]} ${isSpeaking ? 'animate-pulse' : ''}`} 
      />
    </button>
  );
};

export default SpeakerButton;
