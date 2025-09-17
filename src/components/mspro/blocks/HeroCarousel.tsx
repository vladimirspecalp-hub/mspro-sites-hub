import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero-slide-1.png",
    title: "Промышленный альпинизм MSPRO",
    subtitle: "Высотные работы любой сложности",
    description: "Профессиональные услуги промышленного альпинизма с применением современного оборудования и безопасных технологий"
  },
  {
    id: 2,
    image: "/images/hero-slide-2.png", 
    title: "Защита металлоконструкций",
    subtitle: "Антикоррозийная обработка и покраска",
    description: "Комплексная защита металлических конструкций от коррозии с использованием качественных материалов"
  },
  {
    id: 3,
    image: "/images/hero-slide-3.png",
    title: "Эксперты высотных работ",
    subtitle: "Опыт более 10 лет в индустрии",
    description: "Команда сертифицированных специалистов с многолетним опытом выполнения сложных промышленных проектов"
  },
  {
    id: 4,
    image: "/images/hero-slide-4.png",
    title: "Промышленные объекты",
    subtitle: "Работы на нефтехимических предприятиях",
    description: "Специализируемся на обслуживании крупных промышленных объектов и нефтехимических комплексов"
  },
  {
    id: 5,
    image: "/images/hero-slide-5.png",
    title: "Качество и безопасность",
    subtitle: "Соблюдение всех стандартов безопасности",
    description: "Строгое следование требованиям промышленной безопасности и международным стандартам качества"
  },
  {
    id: 6,
    image: "/images/hero-slide-6.png",
    title: "Современные технологии",
    subtitle: "Инновационные методы работы на высоте",
    description: "Применение передовых технологий и методик для эффективного выполнения высотных работ"
  }
];

interface HeroCarouselProps {
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  className?: string;
}

export function HeroCarousel({
  primaryAction = { text: "Получить консультацию", href: "/contacts" },
  secondaryAction = { text: "Наши услуги", href: "/services" },
  className = ""
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Images with Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </AnimatePresence>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto space-y-8"
          >
            {/* Brand tagline */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl font-intro font-medium text-mspro-bright uppercase tracking-[0.2em] mb-4"
            >
              ...Extend the Life of Metal...
            </motion.p>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-metro leading-tight"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
              <span className="text-white drop-shadow-lg">{slides[currentSlide].title}</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl font-intro font-medium text-mspro-bright mb-6 uppercase tracking-wider"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-metro leading-relaxed"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            >
              {slides[currentSlide].description}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button size="lg" className="group shadow-2xl bg-mspro-dark hover:bg-mspro-bright text-white border-0 px-8 py-4 text-lg font-metro font-semibold" asChild>
                <a href={primaryAction.href}>
                  <Phone className="mr-3 h-6 w-6" />
                  {primaryAction.text}
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-mspro-dark shadow-lg px-8 py-4 text-lg font-metro font-semibold" asChild>
                <a href={secondaryAction.href}>
                  {secondaryAction.text}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-mspro-bright scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
        <motion.div
          className="h-full bg-mspro-bright"
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying ? "100%" : `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: isAutoPlaying ? 6 : 0.3, ease: "linear" }}
        />
      </div>
    </section>
  );
}