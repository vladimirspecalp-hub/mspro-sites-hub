import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

interface CTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'accent' | 'gradient';
  className?: string;
}

export function CTA({
  title = "Нужна консультация по проекту?",
  description = "Свяжитесь с нами прямо сейчас - наши эксперты ответят на все вопросы и помогут найти оптимальное решение",
  primaryAction = { text: "Получить консультацию", href: "/contacts" },
  secondaryAction = { text: "Позвонить сейчас", href: "tel:+74950000000" },
  variant = "default",
  className = ""
}: CTAProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'accent':
        return 'bg-accent text-accent-foreground';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <section className={`py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${getVariantClasses()} rounded-2xl mx-4`}
      >
        <div className="container mx-auto px-8 py-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg opacity-90 max-w-2xl mx-auto mb-8"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              variant={variant === 'default' ? 'secondary' : 'outline'}
              asChild 
              className="group"
            >
              <a href={primaryAction.href}>
                {primaryAction.text}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost" 
              asChild
              className={variant === 'default' ? 'text-primary-foreground hover:bg-primary-foreground/10' : ''}
            >
              <a href={secondaryAction.href}>
                <Phone className="mr-2 h-5 w-5" />
                {secondaryAction.text}
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}