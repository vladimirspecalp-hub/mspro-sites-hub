import { Hero } from "@/components/mspro/blocks/Hero";
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
      title: "15 лет опыта",
      description: "Более 500 успешно выполненных проектов в области промышленного альпинизма и антикоррозийной защиты"
    },
    {
      icon: Users,
      title: "Сертифицированная команда",
      description: "Все специалисты имеют допуски СРО и регулярно проходят курсы повышения квалификации"
    },
    {
      icon: Clock,
      title: "Работы в срок",
      description: "Соблюдаем договорные сроки и работаем по утвержденному графику без задержек"
    },
    {
      icon: Award,
      title: "Гарантия качества",
      description: "Предоставляем гарантию на материалы до 15 лет и на работы до 2 лет"
    },
    {
      icon: Hammer,
      title: "Современное оборудование",
      description: "Используем профессиональное оборудование ведущих мировых производителей"
    },
    {
      icon: CheckCircle2,
      title: "Полный цикл услуг",
      description: "От обследования объекта до сдачи работ с полным документооборотом"
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
    <main>
      <Meta seo={seo} />
      
      <Hero 
        backgroundImage="/images/hero-industrial-workers.webp"
      />
      
      <Benefits 
        benefits={benefits}
      />
      
      <ProcessSteps 
        steps={processSteps}
      />
      
      <CTA 
        title="Готовы обсудить ваш проект?"
        description="Получите профессиональную консультацию и коммерческое предложение в течение дня"
        variant="gradient"
      />
    </main>
  );
};

export default Index;
