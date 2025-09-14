import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CMS, type Service } from '@/lib/cms';
import { SEOManager, updateMetaTags } from '@/lib/seo';
import { Meta } from '@/components/mspro/seo/Meta';
import { Breadcrumbs as Breadcrumb } from '@/components/mspro/ui/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FAQ } from '@/components/mspro/blocks/FAQ';
import { ContactForm } from '@/components/mspro/blocks/ContactForm';
import { CTA } from '@/components/mspro/blocks/CTA';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      if (!slug) return;
      
      const serviceData = await CMS.getServiceBySlug(slug);
      setService(serviceData);
      setLoading(false);
      
      if (serviceData) {
        const seo = SEOManager.generateServiceSEO(serviceData);
        updateMetaTags(seo);
      }
    };
    
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
          <p className="text-muted-foreground mb-6">Запрашиваемая услуга не существует или была удалена.</p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к услугам
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const seo = SEOManager.generateServiceSEO(service);

  return (
    <main className="min-h-screen">
      <Meta seo={seo} />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'Услуги', url: '/services' },
            { name: service.title }
          ]}
          className="mb-8"
        />

        {/* Service Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Service Image */}
          <div className="relative">
            <img
              src={service.cover}
              alt={service.title}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute top-6 left-6">
              <Badge variant="secondary" className="text-sm">
                {service.category}
              </Badge>
            </div>
          </div>

          {/* Service Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {service.excerpt}
            </p>

            {service.city_targets && (
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg">
                  <strong>Регионы работы:</strong> {service.city_targets.join(', ')}
                </span>
              </div>
            )}

            {service.price_note && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">₽</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Стоимость работ</h3>
                    <p className="text-lg">{service.price_note}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#contact-form">
                  Получить расчет
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+74950000000">
                  Позвонить
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Service Content */}
        {service.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: service.content.replace(/##/g, '<h2>').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') }}
          />
        )}

        {/* Gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Примеры выполненных работ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.gallery.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Пример работы ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && service.faq.every(item => item.q && item.a) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <FAQ items={service.faq as Array<{q: string; a: string}>} />
          </motion.section>
        )}

        {/* Contact Form */}
        <motion.section
          id="contact-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ContactForm 
            title={`Получить консультацию по услуге "${service.title}"`}
          />
        </motion.section>

        {/* CTA */}
        <CTA 
          title="Нужна консультация по другим услугам?"
          description="Посмотрите полный каталог наших услуг или свяжитесь с нашими экспертами"
          primaryAction={{
            text: "Все услуги",
            href: "/services"
          }}
          secondaryAction={{
            text: "Связаться с нами",
            href: "/contacts"
          }}
        />
      </div>
    </main>
  );
}