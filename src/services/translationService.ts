import { v4 as uuidv4 } from 'uuid';
import { Translation } from '../types';

// In a real app, this would be an actual API client
const translateAPI = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Mock translations for demo
  if (sourceLanguage === 'en' && targetLanguage === 'es') {
    const translations: Record<string, string> = {
      'hello': 'hola',
      'good morning': 'buenos días',
      'goodbye': 'adiós',
      'thank you': 'gracias',
      'please': 'por favor',
      'yes': 'sí',
      'no': 'no',
      'how are you': 'cómo estás',
      'what is your name': 'cómo te llamas',
      'my name is': 'me llamo',
      'i want': 'quiero',
      'i need': 'necesito',
      'where is': 'dónde está',
      'how much': 'cuánto cuesta',
    };
    
    let result = text;
    
    // Replace known phrases
    for (const [eng, span] of Object.entries(translations)) {
      const regex = new RegExp(`\\b${eng}\\b`, 'gi');
      result = result.replace(regex, span);
    }
    
    // If no replacements were made, use a simple algorithm
    if (result === text) {
      result = text.split(' ').map(word => {
        if (word.length > 2) {
          if (/[aeiou]$/.test(word)) return word;
          return word + 'o';
        }
        return word;
      }).join(' ');
    }
    
    return result;
  }
  
  // For other language pairs
  return `${text} (translated to ${targetLanguage})`;
};

export const translateText = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<Translation> => {
  try {
    const translatedText = await translateAPI(text, sourceLanguage, targetLanguage);
    
    return {
      id: uuidv4(),
      sourceText: text,
      translatedText,
      sourceLanguage,
      targetLanguage,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation failed. Please try again.');
  }
};

// Simulate text-to-speech (in a real app, this would use a proper TTS API)
export const textToSpeech = (text: string, languageCode: string): void => {
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-speech not supported in this browser');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode;
  window.speechSynthesis.speak(utterance);
};

// Get user's translation history from localStorage
export const getTranslationHistory = (): Translation[] => {
  try {
    const history = localStorage.getItem('translationHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving translation history:', error);
    return [];
  }
};

// Save a translation to history
export const saveTranslation = (translation: Translation): void => {
  try {
    const history = getTranslationHistory();
    const updatedHistory = [translation, ...history].slice(0, 20); // Keep last 20
    localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving translation:', error);
  }
};