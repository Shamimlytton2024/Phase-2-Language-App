import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, MessageSquare, ChevronRight } from 'lucide-react';
import { languages } from '../data/languages';

const Home: React.FC = () => {
  // Featured languages
  const featuredLanguages = languages.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Unlock Your Language Potential
              </h1>
              <p className="text-lg text-primary-100 mb-8">
                Learn a new language naturally with our innovative translation and audio tools. Practice anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lessons"
                  className="px-6 py-3 bg-highlight-500 hover:bg-highlight-600 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Start Learning
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/lessons"
                  className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Explore Languages
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Language Learning"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Languages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Languages</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose from our most popular language courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLanguages.map((language) => (
              <Link
                key={language.code}
                to={`/lessons?lang=${language.code}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center group"
              >
                <img 
                  src={language.flag} 
                  alt={language.name} 
                  className="w-16 h-16 object-cover rounded-full mb-4 border-2 border-gray-200"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {language.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn {language.name} with our interactive lessons
                </p>
                <div className="mt-4 text-primary-600 group-hover:text-primary-700 font-medium flex items-center">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our approach to language learning is simple and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose Your Language
              </h3>
              <p className="text-gray-600">
                Select from a wide variety of languages to learn at your own pace.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Take Lessons
              </h3>
              <p className="text-gray-600">
                Follow structured lessons with interactive exercises and audio examples.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Practice Translation
              </h3>
              <p className="text-gray-600">
                Reinforce your skills with our translation tool and audio pronunciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of learners who have successfully learned a new language with our platform.
          </p>
          <Link
            to="/lessons"
            className="px-8 py-4 bg-white text-accent-700 hover:bg-gray-100 rounded-lg font-medium text-lg transition-colors inline-flex items-center"
          >
            Start Learning Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;