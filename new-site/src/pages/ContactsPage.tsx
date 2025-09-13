import { Meta } from '@/components/seo/Meta';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactForm } from '@/components/blocks/ContactForm';
import { SEOManager } from '@/lib/seo';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Shield 
} from 'lucide-react';

export function ContactsPage() {
  const seo = SEOManager.generatePageSEO(
    'Контакты MSPRO - Связаться с экспертами промышленного альпинизма',
    'Свяжитесь с MSPRO для получения консультации по промышленному альпинизму и антикоррозийной защите. Телефон, email, адрес офиса в Москве.',
    '/contacts'
  );

  const contactCards = [
    {
      icon: Phone,
      title: "Позвонить нам",
      primary: "+7 (495) 000-00-00",
      secondary: "+7 (812) 000-00-00",
      description: "Звонки принимаем ежедневно с 9:00 до 18:00"
    },
    {
      icon: Mail,
      title: "Написать письмо",
      primary: "info@mspro.ru",
      secondary: "projects@mspro.ru",
      description: "Отвечаем на письма в течение 2 часов"
    },
    {
      icon: MapPin,
      title: "Наш офис",
      primary: "Москва, ул. Примерная, д. 123",
      secondary: "БЦ \"Высотный\", офис 456",
      description: "Прием по предварительной записи"
    }
  ];

  const advantages = [
    {
      icon: Users,
      title: "Экспертная команда",
      description: "15+ лет опыта в промышленном альпинизме"
    },
    {
      icon: Shield,
      title: "Полное страхование",
      description: "Застрахованы все риски и ответственность"
    },
    {
      icon: Clock,
      title: "Срочные вызовы",
      description: "Аварийные работы 24/7 по всей России"
    }
  ];

  return (
    <main className="min-h-screen">
      <Meta seo={seo} />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[{ name: 'Контакты' }]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Готовы ответить на все ваши вопросы о промышленном альпинизме и антикоррозийной защите. 
            Консультация бесплатно, выезд специалиста в течение дня.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="text-center p-8 bg-card rounded-lg border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <card.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-lg font-semibold mb-2">{card.primary}</p>
              <p className="text-muted-foreground mb-3">{card.secondary}</p>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <ContactForm showContactInfo={false} />

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают MSPRO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden border mb-16"
        >
          <div className="h-[400px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Интерактивная карта с местоположением офиса
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Москва, ул. Примерная, д. 123, БЦ "Высотный"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Режим работы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold mb-3">Офис и консультации</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Понедельник - Пятница: 09:00 - 18:00</p>
                <p>Суббота: 10:00 - 16:00</p>
                <p>Воскресенье: выходной</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Экстренные вызовы</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Аварийные ситуации: 24/7</p>
                <p>Срочные работы: круглосуточно</p>
                <p>Выезд бригады: в течение 2 часов</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}