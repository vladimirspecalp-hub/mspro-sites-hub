import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showContactInfo?: boolean;
  className?: string;
}

export function ContactForm({ 
  title = "Получить консультацию", 
  subtitle = "Оставьте заявку и наш специалист свяжется с вами в течение 15 минут",
  showContactInfo = true,
  className = "" 
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here would be actual API call to /api/forms/contact
      console.log('Form submitted:', formData);
      
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время."
      });

      // Reset form
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или позвоните нам напрямую."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+7 (495) 000-00-00",
      href: "tel:+74950000000"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@mspro.ru",
      href: "mailto:info@mspro.ru"
    },
    {
      icon: MapPin,
      title: "Адрес",
      content: "Москва, ул. Примерная, д. 123",
      href: "#"
    }
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Введите имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  placeholder="Опишите ваш проект или задачи..."
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isLoading}
                className="w-full group"
              >
                {isLoading ? (
                  "Отправляется..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Отправить заявку
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                * Обязательные поля. Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
              </p>
            </form>
          </motion.div>

          {/* Contact Information */}
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Контактная информация</h3>
                <p className="text-muted-foreground mb-6">
                  Свяжитесь с нами любым удобным способом или оставьте заявку - мы обязательно ответим!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      {item.href !== "#" ? (
                        <a 
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-semibold mb-3">Время работы</h4>
                <div className="space-y-1 text-muted-foreground">
                  <p>Пн-Пт: 09:00 - 18:00</p>
                  <p>Сб-Вс: 10:00 - 16:00</p>
                  <p className="text-sm">Экстренные вызовы - круглосуточно</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}