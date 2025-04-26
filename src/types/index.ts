export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  progress: number;
  imageUrl: string;
  phrases: {
    sourceText: string;
    translatedText: string;
  }[];
}

export interface UserProgress {
  completedLessons: string[];
  currentLanguage: string;
  translationHistory: Translation[];
  streak: number;
  lastActive: string;
}