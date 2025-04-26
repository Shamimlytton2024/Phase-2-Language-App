import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Award
} from 'lucide-react';
import { getLessonById } from '../data/lessons';
import { getLanguageName } from '../data/languages';
import { textToSpeech } from '../services/translationService';

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lesson = getLessonById(id || '');
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<number[]>([]);
  const [lessonComplete, setLessonComplete] = useState(false);
  
  useEffect(() => {
    // Reset state when the lesson changes
    setCurrentPhraseIndex(0);
    setShowTranslation(false);
    setCompletedPhrases([]);
    setLessonComplete(false);
  }, [id]);
  
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
          <Link to="/lessons" className="text-primary-600 hover:text-primary-700">
            Return to lessons
          </Link>
        </div>
      </div>
    );
  }
  
  const currentPhrase = lesson.phrases[currentPhraseIndex];
  const progress = (completedPhrases.length / lesson.phrases.length) * 100;
  
  const handleNext = () => {
    if (!completedPhrases.includes(currentPhraseIndex)) {
      setCompletedPhrases([...completedPhrases, currentPhraseIndex]);
    }
    
    if (currentPhraseIndex < lesson.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setShowTranslation(false);
    } else {
      setLessonComplete(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
      setShowTranslation(false);
    }
  };
  
  const handlePlayAudio = (text: string, isSource: boolean) => {
    textToSpeech(text, isSource ? 'en' : lesson.language);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Lesson Header */}
      <div className="bg-primary-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/lessons" className="inline-flex items-center text-primary-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lessons
          </Link>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-primary-100 mt-1">
            {getLanguageName('en')} &rarr; {getLanguageName(lesson.language)}
          </p>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-100">
                Progress: {Math.round(progress)}%
              </span>
              <span className="text-sm text-primary-100">
                {completedPhrases.length}/{lesson.phrases.length} phrases
              </span>
            </div>
            <div className="w-full bg-primary-900 rounded-full h-2">
              <div
                className="bg-highlight-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {lessonComplete ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Completed!</h2>
            <p className="text-gray-600 mb-6">
              Congratulations! You've completed the "{lesson.title}" lesson.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lessons"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Back to Lessons
              </Link>
              <button
                onClick={() => {
                  setCurrentPhraseIndex(0);
                  setCompletedPhrases([]);
                  setLessonComplete(false);
                }}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Practice Again
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Phrase {currentPhraseIndex + 1} of {lesson.phrases.length}
                </span>
                {completedPhrases.includes(currentPhraseIndex) && (
                  <span className="inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Learned
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">English</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-2">
                <p className="text-xl font-medium text-gray-900">{currentPhrase.sourceText}</p>
              </div>
              <button
                onClick={() => handlePlayAudio(currentPhrase.sourceText, true)}
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <Volume2 className="h-4 w-4 mr-1" />
                Listen
              </button>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  {getLanguageName(lesson.language)}
                </h3>
                {!showTranslation && (
                  <button
                    onClick={() => setShowTranslation(true)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Show Translation
                  </button>
                )}
              </div>
              
              {showTranslation ? (
                <div className="bg-primary-50 p-4 rounded-lg mb-2 border border-primary-100">
                  <p className="text-xl font-medium text-primary-900">
                    {currentPhrase.translatedText}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-2 border border-dashed border-gray-300 flex items-center justify-center h-16">
                  <p className="text-gray-400">Click "Show Translation" to reveal</p>
                </div>
              )}
              
              {showTranslation && (
                <button
                  onClick={() => handlePlayAudio(currentPhrase.translatedText, false)}
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Listen
                </button>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentPhraseIndex === 0}
                className={`inline-flex items-center px-4 py-2 rounded-lg ${
                  currentPhraseIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                {currentPhraseIndex < lesson.phrases.length - 1 ? 'Next' : 'Complete Lesson'}
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;