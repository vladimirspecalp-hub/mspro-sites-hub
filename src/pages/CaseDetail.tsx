import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Meta } from '@/components/mspro/seo/Meta';
import { SEOManager } from '@/lib/seo';
import { CMS, type CaseStudy } from '@/lib/cms';
import { ChevronLeft, Calendar, MapPin, Users } from 'lucide-react';

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Simulate loading case - replace with actual CMS call when ready
    setTimeout(() => {
      const foundCase = CMS.getCaseBySlug(slug);
      setCaseStudy(foundCase);
      setLoading(false);
    }, 100);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка кейса...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Кейс не найден</p>
          <Link 
            to="/cases" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Вернуться к кейсам
          </Link>
        </div>
      </div>
    );
  }

  const seoData = SEOManager.generateCaseSEO(caseStudy);

  return (
    <>
      <Meta seo={seoData} />
      
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Главная
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/cases" className="text-muted-foreground hover:text-foreground">
              Кейсы
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{caseStudy.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            to="/cases"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Вернуться к кейсам
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                {caseStudy.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {caseStudy.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Date(caseStudy.updatedAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                
                {caseStudy.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{caseStudy.location}</span>
                  </div>
                )}
                
                {caseStudy.team_size && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{caseStudy.team_size} специалистов</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative">
              {caseStudy.cover && (
                <img
                  src={caseStudy.cover}
                  alt={caseStudy.title}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {caseStudy.content}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Фотографии проекта
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.gallery.map((image, index) => (
                <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${caseStudy.title} - фото ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
            Нужен аналогичный проект?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Обсудим детали и рассчитаем стоимость для вашего объекта
          </p>
          <Link 
            to="/contacts" 
            className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </>
  );
}