export const translations = {
  en: {
    home: {
      title: 'Welcome to My Portfolio',
      description: 'I am a software developer specializing in web development.',
      contact: 'Contact Me'
    },
    about: {
      title: 'About Me',
      description: 'Learn more about my journey and experience.'
    }
  },
  es: {
    home: {
      title: 'Bienvenido a Mi Portafolio',
      description: 'Soy un desarrollador de software especializado en desarrollo web.',
      contact: 'Contáctame'
    },
    about: {
      title: 'Sobre Mí',
      description: 'Aprende más sobre mi trayectoria y experiencia.'
    }
  }
};

export type Locale = 'en' | 'es';

export function getTranslations(locale: Locale = 'en') {
  return translations[locale];
} 