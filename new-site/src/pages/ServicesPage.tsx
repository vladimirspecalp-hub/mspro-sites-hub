import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CMS, Service } from '@/lib/cms';
import { Meta } from '@/components/seo/Meta';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SEOManager } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const seo = SEOManager.generatePageSEO(
    'Услуги MSPRO - Промышленный альпинизм и антикоррозийная защита',
    'Полный спектр услуг промышленного альпинизма: антикоррозийная защита, высотные работы, мойка фасадов, герметизация швов. Работаем в Москве и регионах.',
    '/services'
  );

  useEffect(() => {
    const loadServices = async () => {
      const allServices = await CMS.getServices();
      setServices(allServices);
      setCategories(CMS.getCategories());
    };
    loadServices();
  }, []);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <main className="min-h-screen">
      <Meta seo={seo} />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[{ name: 'Услуги' }]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Наши услуги
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Предоставляем полный спектр услуг промышленного альпинизма и антикоррозийной защиты. 
            Работаем с объектами любой сложности в Москве, Санкт-Петербурге и других регионах России.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            Все услуги
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.article
              key={service.slug}
              variants={itemVariants}
              className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={service.cover}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">
                    {service.category}
                  </Badge>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {service.excerpt}
                </p>

                {service.city_targets && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {service.city_targets.slice(0, 2).join(', ')}
                      {service.city_targets.length > 2 && ` +${service.city_targets.length - 2}`}
                    </span>
                  </div>
                )}

                {service.price_note && (
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      {service.price_note}
                    </p>
                  </div>
                )}

                <Button asChild className="w-full group">
                  <Link to={`/services/${service.slug}`}>
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Услуги в категории "{selectedCategory}" не найдены.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}