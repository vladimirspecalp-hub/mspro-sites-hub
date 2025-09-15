import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Meta } from '@/components/mspro/seo/Meta';
import { SEOManager } from '@/lib/seo';
import { CMS, type CaseStudy } from '@/lib/cms';
import casePlaceholder from '/images/placeholders/case-placeholder.webp';

export default function Cases() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cases - replace with actual CMS call when ready
    setTimeout(() => {
      setCases(CMS.getCases());
      setLoading(false);
    }, 100);
  }, []);

  const seoData = SEOManager.generatePageSEO(
    'Портфолио и кейсы MSPRO',
    'Примеры выполненных проектов промышленного альпинизма и антикоррозийной защиты. Реальные кейсы с фотографиями до и после.',
    '/cases'
  );

  if (loading) {
    return (
      <>
        <Meta seo={seoData} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка кейсов...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta seo={seoData} />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Наши проекты
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Примеры выполненных работ по промышленному альпинизму 
            и антикоррозийной защите
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          {cases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Кейсы скоро появятся
              </p>
              <p className="text-muted-foreground">
                Мы работаем над наполнением портфолио
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  to={`/cases/${caseStudy.slug}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={caseStudy.cover || casePlaceholder}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {caseStudy.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {caseStudy.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(caseStudy.updatedAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Хотите увидеть ваш проект в нашем портфолио?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Свяжитесь с нами для обсуждения вашего проекта
          </p>
          <Link 
            to="/contacts" 
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Обсудить проект
          </Link>
        </div>
      </section>
    </>
  );
}