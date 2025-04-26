import React, { useState } from 'react';
import { Mic, Send, Volume2, Copy, CheckCircle2 } from 'lucide-react';

interface TranslationFormProps {
  onTranslate: (text: string) => void;
  isLoading: boolean;
  sourceLanguage: string;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
  onTranslate,
  isLoading,
  sourceLanguage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onTranslate(inputText);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(inputText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Enter text in ${sourceLanguage}...`}
          className="w-full p-4 border border-gray-300 rounded-lg min-h-[120px] resize-y focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          maxLength={500}
        />
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
          {inputText && (
            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              title="Copy text"
            >
              {isCopied ? <CheckCircle2 className="h-5 w-5 text-accent-600" /> : <Copy className="h-5 w-5" />}
            </button>
          )}
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            title="Voice input"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-500">
            {inputText.length} / 500
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`flex items-center px-4 py-2 rounded-lg text-white font-medium ${
              isLoading || !inputText.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 transition-colors'
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Translating...
              </span>
            ) : (
              <>
                <span>Translate</span>
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TranslationForm;