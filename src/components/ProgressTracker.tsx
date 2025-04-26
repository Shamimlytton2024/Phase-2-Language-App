import React from 'react';
import { CheckCircle, Calendar, Flame } from 'lucide-react';
import { UserProgress } from '../types';

interface ProgressTrackerProps {
  userProgress: UserProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userProgress }) => {
  const { completedLessons, streak, lastActive } = userProgress;
  
  // Generate last 7 days for streak calendar
  const generateLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toISOString().split('T')[0];
      
      // Check if user was active on this day (simplified logic)
      const isActive = i === 0 || Math.random() > 0.5;
      
      days.push({
        date: dayStr,
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        isActive,
      });
    }
    return days;
  };
  
  const days = generateLastSevenDays();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Completed Lessons</span>
          </div>
          <p className="text-2xl font-bold text-primary-700">{completedLessons.length}</p>
        </div>
        
        <div className="bg-highlight-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Flame className="h-5 w-5 text-highlight-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Current Streak</span>
          </div>
          <p className="text-2xl font-bold text-highlight-700">{streak} days</p>
        </div>
        
        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-accent-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Last Active</span>
          </div>
          <p className="text-sm font-medium text-accent-700">Today</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Last 7 Days Activity</h4>
        <div className="flex justify-between">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                  ${day.isActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}`}
              >
                {day.isActive && <CheckCircle className="w-4 h-4" />}
              </div>
              <span className="text-xs text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;