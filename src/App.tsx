import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Translation from './pages/Translation';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/translation" element={<Translation />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white mb-2">LinguaLearn</h3>
                <p className="text-sm text-gray-400">Learn languages with ease</p>
              </div>
              <div className="flex space-x-8">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Languages</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">Spanish</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">French</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">German</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-center text-gray-400">
              &copy; {new Date().getFullYear()} LinguaLearn. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;