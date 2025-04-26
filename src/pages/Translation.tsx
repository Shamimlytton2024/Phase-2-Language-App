import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import TranslationForm from '../components/TranslationForm';
import TranslationCard from '../components/TranslationCard';
import { defaultSourceLanguage, defaultTargetLanguage } from '../data/languages';
import { useTranslation } from '../hooks/useTranslation';
import { Translation } from '../types';

const TranslationPage: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState(defaultSourceLanguage);
  const [targetLanguage, setTargetLanguage] = useState(defaultTargetLanguage);
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  
  const { translateText, isLoading, error } = useTranslation();
  
  const handleSourceLanguageChange = (code: string) => {
    setSourceLanguage(code);
  };
  
  const handleTargetLanguageChange = (code: string) => {
    setTargetLanguage(code);
  };
  
  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };
  
  const handleTranslate = async (text: string) => {
    const translation = await translateText(text, sourceLanguage, targetLanguage);
    if (translation) {
      setCurrentTranslation(translation);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Translation Header */}
      <div className="bg-primary-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-700 p-3 rounded-full">
              <Globe className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Text Translation</h1>
          <p className="text-primary-200 max-w-2xl mx-auto">
            Translate text between multiple languages. You can also listen to the pronunciation.
          </p>
        </div>
      </div>
      
      {/* Translation Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6">
            <LanguageSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceLanguageChange={handleSourceLanguageChange}
              onTargetLanguageChange={handleTargetLanguageChange}
              onSwapLanguages={handleSwapLanguages}
            />
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <TranslationForm
              onTranslate={handleTranslate}
              isLoading={isLoading}
              sourceLanguage={sourceLanguage}
            />
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {currentTranslation && (
            <div className="mt-8">
              <TranslationCard
                sourceText={currentTranslation.sourceText}
                translatedText={currentTranslation.translatedText}
                sourceLanguage={currentTranslation.sourceLanguage}
                targetLanguage={currentTranslation.targetLanguage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;