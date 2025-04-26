import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { languages } from '../data/languages';

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (code: string) => void;
  onTargetLanguageChange: (code: string) => void;
  onSwapLanguages: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onSwapLanguages,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <div className="flex-1 w-full">
        <label htmlFor="source-language" className="block text-sm font-medium text-gray-700 mb-1">
          Translate from
        </label>
        <select
          id="source-language"
          value={sourceLanguage}
          onChange={(e) => onSourceLanguageChange(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="self-center mt-6 md:mt-0">
        <button
          onClick={onSwapLanguages}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Swap languages"
        >
          <ArrowRightLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 w-full">
        <label htmlFor="target-language" className="block text-sm font-medium text-gray-700 mb-1">
          Translate to
        </label>
        <select
          id="target-language"
          value={targetLanguage}
          onChange={(e) => onTargetLanguageChange(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;