import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import { getLessonsByLanguage, lessons } from '../data/lessons';
import { languages, getLanguageByCode } from '../data/languages';

const Lessons: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialLangCode = queryParams.get('lang') || 'es';
  
  const [selectedLanguage, setSelectedLanguage] = useState(initialLangCode);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [filteredLessons, setFilteredLessons] = useState(getLessonsByLanguage(selectedLanguage));
  
  useEffect(() => {
    const languageLessons = getLessonsByLanguage(selectedLanguage);
    
    // Apply search term and level filter
    const filtered = languageLessons.filter((lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
      
      return matchesSearch && matchesLevel;
    });
    
    setFilteredLessons(filtered);
  }, [selectedLanguage, searchTerm, levelFilter]);
  
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = event.target.value;
    setSelectedLanguage(langCode);
    navigate(`/lessons?lang=${langCode}`);
  };
  
  const selectedLanguageObj = getLanguageByCode(selectedLanguage);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero section */}
      <div className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedLanguageObj.name} Lessons
              </h1>
              <p className="text-primary-100">
                Master {selectedLanguageObj.name} with our interactive lessons and exercises
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="flex items-center bg-primary-700 rounded-lg p-1">
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="bg-transparent border-none text-white focus:ring-0 focus:outline-none py-2 pl-3 pr-8 appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-gray-800">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Filter by level:</span>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lessons grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find lessons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;