import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2 } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-40 overflow-hidden">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{lesson.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(lesson.level)}`}>
            {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{lesson.phrases.length} phrases</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium text-primary-600">{lesson.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
        </div>
        
        <Link
          to={`/lesson/${lesson.id}`}
          className="block w-full text-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
        >
          Start Lesson
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;