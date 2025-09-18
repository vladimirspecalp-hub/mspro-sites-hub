import { Header } from "@/components/mspro/blocks/Header";
import { Footer } from "@/components/mspro/blocks/Footer";
import { HeroCarousel } from "@/components/mspro/blocks/HeroCarousel";
import { Benefits } from "@/components/mspro/blocks/Benefits";
import { ProcessSteps } from "@/components/mspro/blocks/ProcessSteps";
import { CTA } from "@/components/mspro/blocks/CTA";
import { Meta } from "@/components/mspro/seo/Meta";
import { SEOManager } from '@/lib/seo';
import { 
  Shield, 
  Users, 
  Clock, 
  Award, 
  Hammer, 
  CheckCircle2 
} from 'lucide-react';

const Index = () => {
  const seo = SEOManager.generatePageSEO(
    'MSPRO - Промышленный альпинизм и антикоррозийная защита',
    'Профессиональные услуги промышленного альпинизма, антикоррозийной защиты металлоконструкций, высотные работы в Москве и регионах России.',
    '/',
    '/images/hero-industrial-workers.webp'
  );

  const benefits = [
    {
      icon: Shield,
      title: "Узкая специализация",
      description: "Работаем только в специализированном направлении - ремонт и покраска дымовых труб, покраска линий электропередач"
    },
    {
      icon: Users,
      title: "Опытная команда",
      description: "Профессиональные альпинисты с допусками для высотных работ и обслуживания ЛЭП"
    },
    {
      icon: Hammer,
      title: "Пескоструйная очистка",
      description: "Профессиональная пескоструйная очистка металлоконструкций до степени Sa 2,5"
    },
    {
      icon: Award,
      title: "Антикоррозийная защита",
      description: "Полный комплекс услуг по антикоррозийной защите металлоконструкций"
    },
    {
      icon: CheckCircle2,
      title: "Такелажные работы",
      description: "Монтаж металлоконструкций, такелажные работы любой сложности"
    },
    {
      icon: Clock,
      title: "Огнезащита",
      description: "Огнезащита металлоконструкций в соответствии с требованиями пожарной безопасности"
    }
  ];

  const processSteps = [
    {
      title: "Обследование объекта",
      description: "Выезд специалиста на объект для оценки состояния и объема работ",
      details: [
        "Визуальный осмотр конструкций",
        "Замеры площадей и объемов",
        "Фотофиксация дефектов",
        "Оценка доступности для работ"
      ]
    },
    {
      title: "Разработка проекта",
      description: "Составление технического решения и сметной документации",
      details: [
        "Выбор оптимальной технологии",
        "Расчет материалов и оборудования",
        "Составление календарного плана",
        "Подготовка проектной документации"
      ]
    },
    {
      title: "Подготовительные работы",
      description: "Организация рабочего места и доставка материалов",
      details: [
        "Установка ограждений и укрытий",
        "Доставка оборудования и материалов",
        "Подготовка допусков и разрешений",
        "Инструктаж по безопасности"
      ]
    },
    {
      title: "Выполнение основных работ",
      description: "Производство работ согласно утвержденной технологии",
      details: [
        "Подготовка поверхности",
        "Нанесение защитных покрытий",
        "Контроль качества на каждом этапе",
        "Ведение исполнительной документации"
      ]
    },
    {
      title: "Контроль качества и приемка",
      description: "Финальная проверка и сдача работ заказчику",
      details: [
        "Контроль толщины покрытий",
        "Проверка адгезии материалов",
        "Оформление актов выполненных работ",
        "Передача гарантийной документации"
      ]
    }
  ];

  return (
    <>
      <Meta seo={seo} />
      <Header />
      
      <main>
        <HeroCarousel 
          primaryAction={{ text: "Получить консультацию", href: "/contacts" }}
          secondaryAction={{ text: "Наши услуги", href: "/services" }}
        />
        
        <Benefits 
          title="Почему выбирают нас"
          benefits={benefits}
        />
        
        <ProcessSteps 
          title="Как мы работаем"
          steps={processSteps}
        />
        
        <CTA 
          title="Готовы обсудить ваш проект?"
          description="Получите профессиональную консультацию и коммерческое предложение в течение дня"
          variant="gradient"
        />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
