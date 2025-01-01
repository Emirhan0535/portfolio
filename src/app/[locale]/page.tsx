'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { TypeWriter } from '@/components/TypeWriter';
import dynamic from 'next/dynamic'

const Earth3D = dynamic(() => import('@/components/Earth3D'), { ssr: false })

const smoothScrollTo = (element: HTMLElement) => {
  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1500; // ms cinsinden animasyon süresi
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing fonksiyonu (cubic-bezier benzeri yumuşak geçiş)
    const ease = (t: number) => t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    window.scrollTo(0, startPosition + distance * ease(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const NavigationButton = ({ 
  show, 
  direction = 'down', 
  onClick,
  className = ''
}: { 
  show: boolean; 
  direction?: 'up' | 'down'; 
  onClick: () => void;
  className?: string;
}) => (
  show ? (
    <div className={`absolute left-1/2 transform -translate-x-1/2 ${direction === 'down' ? 'bottom-12' : 'top-12'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}>
      <button 
        onClick={onClick}
        className="text-white/60 hover:text-white transition-colors duration-300"
      >
        <div className="animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {direction === 'down' ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            )}
          </svg>
        </div>
      </button>
    </div>
  ) : null
);

export default function Home() {
  const t = useTranslations('home');
  const [text, setText] = useState('');
  const [whoText, setWhoText] = useState('');
  const [amText, setAmText] = useState('');
  const [iText, setIText] = useState('');
  const [questionMark, setQuestionMark] = useState('');
  const fullText = 'Emirhan Akdeniz.';
  const [showSecondText, setShowSecondText] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [showAboutTitle, setShowAboutTitle] = useState(false);
  const [showTechTitle, setShowTechTitle] = useState(false);
  const [showProjectsTitle, setShowProjectsTitle] = useState(false);
  const [showContactTitle, setShowContactTitle] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const techTitleRef = useRef<HTMLDivElement>(null);
  const projectsTitleRef = useRef<HTMLDivElement>(null);
  const contactTitleRef = useRef<HTMLDivElement>(null);

  const technologies = [
    t('software_development'),
    t('web_design'),
    t('mobile_development'),
    t('cloud_solutions'),
    t('ui_ux_design'),
    t('database_management')
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      smoothScrollTo(ref.current);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowSecondText(true);
        
        // "who" yazısı
        setTimeout(() => {
          let whoIndex = 0;
          const whoInterval = setInterval(() => {
            if (whoIndex <= 3) {
              setWhoText("who".slice(0, whoIndex));
              whoIndex++;
            } else {
              clearInterval(whoInterval);
              
              // "am" yazısı
              setTimeout(() => {
                let amIndex = 0;
                const amInterval = setInterval(() => {
                  if (amIndex <= 2) {
                    setAmText("am".slice(0, amIndex));
                    amIndex++;
                  } else {
                    clearInterval(amInterval);
                    
                    // "i" yazısı
                    setTimeout(() => {
                      setIText("i");
                      
                      // "?" işareti
                      setTimeout(() => {
                        setQuestionMark("?");
                        setTimeout(() => setShowArrow(true), 1000);
                      }, 400);
                    }, 400);
                  }
                }, 150);
              }, 400);
            }
          }, 150);
        }, 0);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observers = [
      { ref: aboutTitleRef, setState: setShowAboutTitle },
      { ref: techTitleRef, setState: setShowTechTitle },
      { ref: projectsTitleRef, setState: setShowProjectsTitle },
      { ref: contactTitleRef, setState: setShowContactTitle }
    ].map(({ ref, setState }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState(entry.isIntersecting);
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPreviousSection = () => {
    const sections = [contactSectionRef, projectsSectionRef, techSectionRef, aboutSectionRef];
    const currentSection = sections.find(section => {
      if (!section.current) return false;
      const rect = section.current.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom > 0;
    });

    if (currentSection?.current) {
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex < sections.length - 1) {
        const previousSection = sections[currentIndex + 1].current;
        if (previousSection) {
          smoothScrollTo(previousSection);
        }
      } else if (currentIndex === sections.length - 1) {
        // En üst bölüme dönüş için
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      <ThemeToggle />
      <NavigationButton 
        show={showScrollUp}
        onClick={scrollToPreviousSection}
        direction="up"
      />
      {/* Giriş Ekranı */}
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden group">
        <main className="text-center z-[101] -mt-20">
          <ScrollAnimation direction="down" delay={0.5}>
            <h1 className="text-7xl font-extralight text-white mb-4 tracking-wider font-['Helvetica_Neue'] leading-relaxed">
              {text}
            </h1>
          </ScrollAnimation>
          {showSecondText && (
            <ScrollAnimation direction="up" delay={1}>
              <p className="text-lg text-white mt-4 font-semibold uppercase tracking-widest flex justify-center gap-2">
                <span className="transition-opacity duration-300">{whoText}</span>
                <span className="transition-opacity duration-300">{amText}</span>
                <span className="transition-opacity duration-300">{iText}</span>
                <span className="transition-opacity duration-300">{questionMark}</span>
              </p>
            </ScrollAnimation>
          )}
          {showArrow && (
            <NavigationButton 
              show={true} 
              onClick={() => scrollToSection(aboutSectionRef)} 
              direction="down"
            />
          )}
        </main>
      </div>

      {/* Hakkımda Bölümü */}
      <div 
        ref={aboutSectionRef}
        className="min-h-screen bg-black relative group"
      >
        <div 
          ref={aboutTitleRef}
          className="container mx-auto px-16 pt-32"
        >
          <ScrollAnimation direction="right">
            <h2 className={`text-white text-3xl font-normal tracking-wider pl-8 border-l-4 border-white/40`}>
              {t('about_me')}
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.3}>
            <div className="mt-16 pl-8 max-w-3xl">
              <TypeWriter 
                text={t('about_text')}
                delay={0.5}
                speed={20}
                className="text-white/90 text-xl font-light leading-relaxed"
              />
            </div>
          </ScrollAnimation>

          {showAboutTitle && (
            <>
              <NavigationButton 
                show={true}
                onClick={() => scrollToSection(techSectionRef)} 
                direction="down"
              />
              <NavigationButton 
                show={true}
                onClick={scrollToPreviousSection} 
                direction="up"
              />
            </>
          )}
        </div>
      </div>

      {/* Teknolojiler Bölümü */}
      <div 
        ref={techSectionRef}
        className="min-h-screen bg-black relative group"
      >
        <div 
          ref={techTitleRef}
          className="container mx-auto px-16 pt-32"
        >
          <ScrollAnimation direction="right">
            <h2 
              className={`
                text-white text-3xl font-light tracking-wider pl-8 border-l-4 border-white/20
                transform transition-all duration-1000 ease-out
                ${showTechTitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
            >
              {t('technologies')}
            </h2>
          </ScrollAnimation>

          <div className="mt-16 pl-8">
            {technologies.map((item, index) => (
              <ScrollAnimation 
                key={item}
                direction="left"
                delay={index * 0.1}
              >
                <p className="text-white/90 text-2xl font-light tracking-wide mb-6 hover:text-white hover:translate-x-2 transition-all duration-300">
                  {item}
                </p>
              </ScrollAnimation>
            ))}
          </div>

          {showTechTitle && (
            <>
              <NavigationButton 
                show={true}
                onClick={() => scrollToSection(projectsSectionRef)} 
                direction="down"
              />
              <NavigationButton 
                show={true}
                onClick={scrollToPreviousSection} 
                direction="up"
              />
            </>
          )}
        </div>
      </div>

      {/* Projeler Bölümü */}
      <div 
        ref={projectsSectionRef}
        className="min-h-screen bg-black relative group"
      >
        <div 
          ref={projectsTitleRef}
          className="container mx-auto px-16 pt-32"
        >
          <ScrollAnimation direction="right">
            <h2 
              className={`
                text-white text-3xl font-light tracking-wider pl-8 border-l-4 border-white/20
                transform transition-all duration-1000 ease-out
                ${showProjectsTitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
            >
              {t('projects')}
            </h2>
          </ScrollAnimation>

          <div className="mt-16 pl-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((num, index) => (
              <ScrollAnimation
                key={num}
                direction="up"
                delay={index * 0.2}
              >
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-white text-xl font-normal mb-4">
                    {t(`project_${num}`)}
                  </h3>
                  <p className="text-white/90">
                    {t(`project_desc_${num}`)}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {showProjectsTitle && (
            <>
              <NavigationButton 
                show={true}
                onClick={() => scrollToSection(contactSectionRef)} 
                direction="down"
              />
              <NavigationButton 
                show={true}
                onClick={scrollToPreviousSection} 
                direction="up"
              />
            </>
          )}
        </div>
      </div>

      {/* İletişim Bölümü */}
      <div 
        ref={contactSectionRef}
        className="min-h-screen bg-black relative group"
      >
        <div 
          ref={contactTitleRef}
          className="container mx-auto px-16 pt-32"
        >
          <ScrollAnimation direction="right">
            <h2 
              className={`
                text-white text-3xl font-light tracking-wider pl-8 border-l-4 border-white/20
                transform transition-all duration-1000 ease-out
                ${showContactTitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
            >
              {t('contact')}
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={0.3}>
            <div className="mt-16 pl-8 flex flex-col gap-8">
              <a 
                href="mailto:your.email@example.com" 
                className="text-white/90 text-xl font-light hover:text-white transition-colors duration-300"
              >
                {t('email')}
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 text-xl font-light hover:text-white transition-colors duration-300"
              >
                {t('github')}
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 text-xl font-light hover:text-white transition-colors duration-300"
              >
                {t('linkedin')}
              </a>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.5}>
            <div className="mt-16">
              <Earth3D />
            </div>
          </ScrollAnimation>

          {showContactTitle && (
            <NavigationButton 
              show={true}
              onClick={scrollToPreviousSection} 
              direction="up"
            />
          )}
        </div>
      </div>
    </div>
  );
} 