import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  className?: string;
}

export function Hero({
  title = "Промышленный альпинизм и антикоррозийная защита",
  subtitle = "MSPRO - эксперты высотных работ",
  description = "Профессиональные услуги промышленного альпинизма, антикоррозийной защиты металлоконструкций и высотных работ любой сложности. Работаем в Москве, СПб и регионах России.",
  primaryAction = { text: "Получить консультацию", href: "/contacts" },
  secondaryAction = { text: "Наши услуги", href: "/services" },
  backgroundImage,
  className = ""
}: HeroProps) {
  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
       />
      )}
      
     
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold font-metro leading-tight"
          >
            <span className="text-primary-foreground drop-shadow-lg">{title}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl font-intro font-medium text-white mb-6 uppercase tracking-wider"
          >
            {subtitle}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-metro"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Button size="lg" variant="brand" asChild className="group shadow-lg">
              <a href={primaryAction.href}>
                <Phone className="mr-2 h-5 w-5" />
                {primaryAction.text}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <a href={secondaryAction.href}>
                {secondaryAction.text}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-primary/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
