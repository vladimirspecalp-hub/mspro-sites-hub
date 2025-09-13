import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CMS, Service } from '@/lib/cms';
import { Meta } from '@/components/seo/Meta';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SEOManager } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FAQ } from '@/components/blocks/FAQ';
import { ContactForm } from '@/components/blocks/ContactForm';
import { CTA } from '@/components/blocks/CTA';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Phone,
  ArrowRight 
} from 'lucide-react';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      if (!slug) return;
      
      setLoading(true);
      const serviceData = await CMS.getServiceBySlug(slug);
      setService(serviceData);
      
      if (serviceData) {
        const allServices = await CMS.getServices();
        const related = allServices
          .filter(s => s.category === serviceData.category && s.slug !== slug)
          .slice(0, 3);
        setRelatedServices(related);
      }
      
      setLoading(false);
    };
    
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
        <Link to="/services">
          <Button>Вернуться к услугам</Button>
        </Link>
      </div>
    );
  }

  const seo = SEOManager.generateServiceSEO(service);

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    const sections = content.split('##').filter(Boolean);
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const body = lines.slice(1).join('\n').trim();
      
      return (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="prose prose-lg max-w-none">
            {body.split('\n').map((line, lineIndex) => {
              if (line.trim().startsWith('-')) {
                // List item
                return (
                  <li key={lineIndex} className="ml-4">
                    {line.trim().substring(1).trim()}
                  </li>
                );
              } else if (line.trim().startsWith('1.') || /^\d+\./.test(line.trim())) {
                // Numbered list item
                return (
                  <div key={lineIndex} className="flex items-start space-x-3 mb-3">
                    <span className="font-bold text-primary">{line.trim().split(' ')[0]}</span>
                    <span>{line.trim().substring(line.indexOf(' ') + 1)}</span>
                  </div>
                );
              } else if (line.trim()) {
                // Regular paragraph
                return (
                  <p key={lineIndex} className="mb-4 text-muted-foreground leading-relaxed">
                    {line.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </motion.section>
      );
    });
  };

  return (
    <main className="min-h-screen">
      <Meta seo={seo} />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { name: 'Услуги', href: '/services' },
            { name: service.title }
          ]}
          className="mb-8"
        />

        {/* Service Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 mb-12"
        >
          <div>
            <Badge variant="secondary" className="mb-4">
              {service.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {service.excerpt}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {service.city_targets && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">География работ</p>
                    <p className="text-sm text-muted-foreground">
                      {service.city_targets.join(', ')}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Гарантия</p>
                  <p className="text-sm text-muted-foreground">До 15 лет на покрытие</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Срок выполнения</p>
                  <p className="text-sm text-muted-foreground">От 3 дней</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Консультация</p>
                  <p className="text-sm text-muted-foreground">Бесплатно</p>
                </div>
              </div>
            </div>

            {service.price_note && (
              <div className="p-4 bg-primary/5 rounded-lg mb-8">
                <p className="font-medium text-primary">
                  {service.price_note}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="/contacts">
                  Получить расчет
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+74950000000">
                  Позвонить сейчас
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={service.cover}
              alt={service.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* Service Content */}
        <div className="max-w-4xl mx-auto mb-12">
          {service.content && renderContent(service.content)}
        </div>

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <FAQ items={service.faq} />
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Похожие услуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map(relatedService => (
                <motion.div
                  key={relatedService.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={relatedService.cover}
                    alt={relatedService.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {relatedService.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {relatedService.excerpt}
                    </p>
                    <Button asChild className="w-full">
                      <Link to={`/services/${relatedService.slug}`}>
                        Подробнее
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <CTA 
          title="Заинтересовала эта услуга?"
          description="Получите детальную консультацию и индивидуальное коммерческое предложение"
        />
      </div>
    </main>
  );
}