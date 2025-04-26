import React, { useState } from 'react';
import { Volume2, Copy, CheckCircle2 } from 'lucide-react';
import { getLanguageName } from '../data/languages';

interface TranslationCardProps {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  sourceText,
  translatedText,
  sourceLanguage,
  targetLanguage,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const playAudio = (text: string, languageCode: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCode;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slideUp">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Translation ({getLanguageName(sourceLanguage)} → {getLanguageName(targetLanguage)})
        </h3>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Original text:</div>
        <p className="text-gray-700">{sourceText}</p>
        <button
          onClick={() => playAudio(sourceText, sourceLanguage)}
          className="mt-2 inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
          aria-label="Listen to original text"
        >
          <Volume2 className="h-4 w-4 mr-1" />
          Listen
        </button>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500 mb-1">Translation:</div>
        <p className="text-gray-800 font-medium">{translatedText}</p>
        <div className="mt-2 flex space-x-4">
          <button
            onClick={() => playAudio(translatedText, targetLanguage)}
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
            aria-label="Listen to translation"
          >
            <Volume2 className="h-4 w-4 mr-1" />
            Listen
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
            aria-label="Copy translation"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;