import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Greetings and Introductions',
    description: 'Learn how to introduce yourself and greet others in Spanish.',
    level: 'beginner',
    language: 'es',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/7048043/pexels-photo-7048043.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: 'Hello', translatedText: 'Hola' },
      { sourceText: 'Good morning', translatedText: 'Buenos días' },
      { sourceText: 'Good afternoon', translatedText: 'Buenas tardes' },
      { sourceText: 'My name is...', translatedText: 'Me llamo...' },
      { sourceText: 'Nice to meet you', translatedText: 'Mucho gusto' },
    ],
  },
  {
    id: '2',
    title: 'Common Phrases for Travelers',
    description: 'Essential phrases for traveling in Spanish-speaking countries.',
    level: 'beginner',
    language: 'es',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: 'Where is the bathroom?', translatedText: '¿Dónde está el baño?' },
      { sourceText: 'How much does it cost?', translatedText: '¿Cuánto cuesta?' },
      { sourceText: 'I would like...', translatedText: 'Me gustaría...' },
      { sourceText: 'Do you speak English?', translatedText: '¿Habla inglés?' },
      { sourceText: 'I need help', translatedText: 'Necesito ayuda' },
    ],
  },
  {
    id: '3',
    title: 'Food and Dining',
    description: 'Learn vocabulary related to food and dining experiences.',
    level: 'beginner',
    language: 'es',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: 'I would like to order', translatedText: 'Me gustaría ordenar' },
      { sourceText: 'The menu, please', translatedText: 'El menú, por favor' },
      { sourceText: 'The check, please', translatedText: 'La cuenta, por favor' },
      { sourceText: 'It was delicious', translatedText: 'Estaba delicioso' },
      { sourceText: 'I am vegetarian', translatedText: 'Soy vegetariano/a' },
    ],
  },
  {
    id: '4',
    title: 'Basic Conversation',
    description: 'Practice everyday conversation in French.',
    level: 'beginner',
    language: 'fr',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/5935755/pexels-photo-5935755.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: 'Hello', translatedText: 'Bonjour' },
      { sourceText: 'How are you?', translatedText: 'Comment allez-vous?' },
      { sourceText: 'I am fine, thank you', translatedText: 'Je vais bien, merci' },
      { sourceText: 'What is your name?', translatedText: 'Comment vous appelez-vous?' },
      { sourceText: 'Nice to meet you', translatedText: 'Enchanté' },
    ],
  },
  {
    id: '5',
    title: 'Shopping in German',
    description: 'Learn vocabulary for shopping in Germany.',
    level: 'beginner',
    language: 'de',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: 'How much does this cost?', translatedText: 'Wie viel kostet das?' },
      { sourceText: 'I would like to buy this', translatedText: 'Ich möchte das kaufen' },
      { sourceText: 'Do you have it in another color?', translatedText: 'Haben Sie es in einer anderen Farbe?' },
      { sourceText: 'Where is the fitting room?', translatedText: 'Wo ist die Umkleidekabine?' },
      { sourceText: "I'll take it", translatedText: 'Ich nehme es' },
    ],
  },
  {
    id: '6',
    title: 'Weather and Seasons',
    description: 'Weather-related vocabulary in Italian.',
    level: 'intermediate',
    language: 'it',
    progress: 0,
    imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
    phrases: [
      { sourceText: "What's the weather like today?", translatedText: "Com'è il tempo oggi?" },
      { sourceText: "It's sunny", translatedText: 'È soleggiato' },
      { sourceText: "It's raining", translatedText: 'Sta piovendo' },
      { sourceText: "It's cold", translatedText: 'Fa freddo' },
      { sourceText: "It's hot", translatedText: 'Fa caldo' },
    ],
  },
];

export const getLessonsByLanguage = (languageCode: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.language === languageCode);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};