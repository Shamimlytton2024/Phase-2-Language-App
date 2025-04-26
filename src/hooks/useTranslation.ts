import { useState } from 'react';
import { Translation } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Translation[]>([]);

  const translateText = async (
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<Translation | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call
      // const response = await fetch('https://api.translator.com/translate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text, sourceLanguage, targetLanguage }),
      // });
      
      // Mock translation - this would come from the API
      let translatedText = '';
      
      // Simple mock translations for demo purposes
      if (sourceLanguage === 'en' && targetLanguage === 'es') {
        const translations: Record<string, string> = {
          'hello': 'hola',
          'goodbye': 'adiós',
          'thank you': 'gracias',
          'please': 'por favor',
          'yes': 'sí',
          'no': 'no',
          'how are you': 'cómo estás',
          'my name is': 'me llamo',
          'i want': 'quiero',
          'i need': 'necesito',
        };
        
        // Try to find exact matches or just append 'o' to mock translation
        const lowercaseText = text.toLowerCase();
        if (Object.keys(translations).some(key => lowercaseText.includes(key))) {
          translatedText = Object.keys(translations).reduce((result, key) => {
            return result.replace(new RegExp(key, 'gi'), translations[key]);
          }, text);
        } else {
          translatedText = text.split(' ').map(word => {
            // Simple rule to make it look Spanish-like
            if (word.length > 2) {
              if (word.endsWith('e')) return word.slice(0, -1) + 'o';
              if (word.endsWith('y')) return word.slice(0, -1) + 'io';
              return word + (word.endsWith('a') || word.endsWith('o') ? '' : 'o');
            }
            return word;
          }).join(' ');
        }
      } else {
        // For other language pairs, just append language code to make it look translated
        translatedText = `${text} (in ${targetLanguage})`;
      }
      
      const translation: Translation = {
        id: uuidv4(),
        sourceText: text,
        translatedText,
        sourceLanguage,
        targetLanguage,
        timestamp: Date.now(),
      };
      
      setTranslations((prev) => [translation, ...prev]);
      setIsLoading(false);
      return translation;
    } catch (err) {
      setError('Translation failed. Please try again.');
      setIsLoading(false);
      return null;
    }
  };

  return { translateText, isLoading, error, translations };
};

export default useTranslation;