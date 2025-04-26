import { Language } from '../types';

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: 'https://images.pexels.com/photos/3621107/pexels-photo-3621107.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'fr',
    name: 'French',
    flag: 'https://images.pexels.com/photos/1647943/pexels-photo-1647943.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'de',
    name: 'German',
    flag: 'https://images.pexels.com/photos/1207949/pexels-photo-1207949.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'it',
    name: 'Italian',
    flag: 'https://images.pexels.com/photos/1373986/pexels-photo-1373986.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    flag: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'ja',
    name: 'Japanese',
    flag: 'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
  {
    code: 'zh',
    name: 'Chinese',
    flag: 'https://images.pexels.com/photos/2846070/pexels-photo-2846070.jpeg?auto=compress&cs=tinysrgb&w=48&h=32&dpr=2',
  },
];

export const defaultSourceLanguage = 'en';
export const defaultTargetLanguage = 'es';

export const getLanguageByCode = (code: string): Language => {
  return languages.find((lang) => lang.code === code) || languages[0];
};

export const getLanguageName = (code: string): string => {
  return getLanguageByCode(code).name;
};