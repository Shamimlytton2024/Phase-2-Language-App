import React from 'react';
import { Award, BookOpen, Clock, Download } from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';
import TranslationCard from '../components/TranslationCard';
import { UserProgress } from '../types';
import { getTranslationHistory } from '../services/translationService';

const Profile: React.FC = () => {
  // Mock user data
  const userProgress: UserProgress = {
    completedLessons: ['1', '2', '4'],
    currentLanguage: 'es',
    translationHistory: getTranslationHistory().slice(0, 3),
    streak: 5,
    lastActive: new Date().toISOString(),
  };
  
  // Get recent translations
  const recentTranslations = userProgress.translationHistory;
  
  // Mock achievements
  const achievements = [
    {
      id: '1',
      title: 'First Lesson',
      description: 'Complete your first lesson',
      icon: <BookOpen className="h-6 w-6 text-primary-600" />,
      achieved: true,
    },
    {
      id: '2',
      title: '3-Day Streak',
      description: 'Learn for 3 consecutive days',
      icon: <Award className="h-6 w-6 text-primary-600" />,
      achieved: true,
    },
    {
      id: '3',
      title: '10 Translations',
      description: 'Complete 10 translations',
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      achieved: false,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Profile Header */}
      <div className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {/* User initial */}
                U
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold mb-1">User Profile</h1>
                <p className="text-primary-200">Joined June 2023</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="bg-white text-primary-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Progress
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <ProgressTracker userProgress={userProgress} />
      </div>
      
      {/* Recent Activity & Achievements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            {/* Recent Translations */}
            <div className="space-y-6">
              {recentTranslations.length > 0 ? (
                recentTranslations.map((translation) => (
                  <TranslationCard
                    key={translation.id}
                    sourceText={translation.sourceText}
                    translatedText={translation.translatedText}
                    sourceLanguage={translation.sourceLanguage}
                    targetLanguage={translation.targetLanguage}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">No recent translations.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {achievements.map((achievement) => (
                  <li key={achievement.id} className="p-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.achieved ? 'bg-primary-100' : 'bg-gray-100'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.achieved ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Achieved
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;