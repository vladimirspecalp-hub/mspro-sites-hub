import { Meta } from '@/components/mspro/seo/Meta';
import { SEOManager } from '@/lib/seo';
import aboutHero from '/images/about-hero.webp';

export default function About() {
  const seoData = SEOManager.generatePageSEO(
    'О компании MSPRO',
    'MSPRO - ведущая компания промышленного альпинизма и антикоррозийной защиты. Более 10 лет опыта в высотных работах и защите металлоконструкций.',
    '/about'
  );

  return (
    <>
      <Meta seo={seoData} />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            О компании MSPRO
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Ведущая компания промышленного альпинизма и антикоррозийной защиты
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Наша история
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                MSPRO была основана более 10 лет назад группой профессиональных альпинистов 
                и специалистов по антикоррозийной защите. За годы работы мы выполнили сотни 
                проектов различной сложности.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Наша команда состоит из сертифицированных специалистов, которые регулярно 
                проходят обучение и повышают квалификацию. Мы используем только современное 
                оборудование и качественные материалы.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                Ключевые факты
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">10+</span>
                  </div>
                  <span className="text-card-foreground">лет опыта</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">500+</span>
                  </div>
                  <span className="text-card-foreground">выполненных проектов</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">50+</span>
                  </div>
                  <span className="text-card-foreground">специалистов в команде</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Наши основные направления
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧗</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Промышленный альпинизм
              </h3>
              <p className="text-muted-foreground">
                Высотные работы любой сложности с соблюдением всех требований безопасности
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Антикоррозийная защита
              </h3>
              <p className="text-muted-foreground">
                Комплексная защита металлоконструкций от коррозии и атмосферных воздействий
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Ремонт и обслуживание
              </h3>
              <p className="text-muted-foreground">
                Техническое обслуживание и ремонт промышленных объектов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Свяжитесь с нами для консультации и расчета стоимости ваших задач
          </p>
          <a 
            href="/contacts" 
            className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            Связаться с нами
          </a>
        </div>
      </section>
    </>
  );
}