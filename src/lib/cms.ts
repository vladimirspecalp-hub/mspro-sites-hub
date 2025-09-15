import { z } from 'zod';

// Service Schema
export const ServiceSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  category: z.string(),
  city_targets: z.array(z.string()).optional(),
  cover: z.string(),
  gallery: z.array(z.string()).optional(),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string()
  })).optional(),
  price_note: z.string().optional(),
  schema: z.object({
    type: z.string()
  }).optional(),
  updatedAt: z.string(),
  content: z.string().optional()
});

export type Service = z.infer<typeof ServiceSchema>;

// Case Study Schema
export const CaseStudySchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  cover: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  location: z.string().optional(),
  team_size: z.number().optional(),
  duration: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  client: z.string().optional(),
  updatedAt: z.string()
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

// Content Management System
export class CMS {
  private static services: Service[] = [
    {
      title: "Антикоррозийная защита металлоконструкций",
      slug: "antikorroziya",
      excerpt: "Промышленная окраска, пескоструй, огнезащита, высотные работы.",
      category: "Антикор",
      city_targets: ["Москва", "СПб", "Ростов-на-Дону"],
      cover: "/images/services/antikorr/cover.webp",
      gallery: ["/images/services/antikorr/1.webp", "/images/services/antikorr/2.webp"],
      faq: [
        {
          q: "Какие технологии применяете?",
          a: "Sa 2.5, Airless, двухкомпонентные системы, контроль толщиномером."
        },
        {
          q: "Какие гарантии предоставляете?",
          a: "Гарантия на покрытие от 5 до 15 лет в зависимости от системы."
        }
      ],
      price_note: "От 490 ₽/м², расчет после осмотра.",
      schema: { type: "Service" },
      updatedAt: "2025-09-13",
      content: `## Преимущества

- Профессиональное оборудование Sa 2.5
- Сертифицированные материалы ведущих производителей
- Контроль качества толщиномером
- Работы на высоте любой сложности

## Технология работ

1. Подготовка поверхности пескоструйной обработкой
2. Обеспыливание и обезжиривание
3. Нанесение грунта распылением
4. Контроль толщины покрытия
5. Нанесение финишного покрытия

## Этапы выполнения

1. **Обследование объекта** - выезд специалиста, замеры
2. **Подготовка проекта** - расчет материалов, составление сметы  
3. **Подготовительные работы** - установка лесов, укрытие
4. **Пескоструйная обработка** - очистка до степени Sa 2.5
5. **Нанесение покрытий** - грунт и финишные слои
6. **Контроль качества** - толщиномер, адгезия

## Гарантии

- Гарантия на материалы - до 15 лет
- Гарантия на работы - 2 года
- Страхование объектов до 10 млн рублей
- Сертификаты соответствия на все материалы`
    },
    {
      title: "Промышленный альпинизм",
      slug: "promyshlenniy-alpinizm",
      excerpt: "Высотные работы любой сложности: мойка фасадов, монтаж, обследование.",
      category: "Высотные работы",
      city_targets: ["Москва", "СПб"],
      cover: "/images/services/alpinizm/cover.webp",
      price_note: "От 350 ₽/м², минимальный заказ 10 000 ₽",
      schema: { type: "Service" },
      updatedAt: "2025-09-13",
      content: `## Преимущества

- Сертифицированные альпинисты с опытом от 5 лет
- Собственное снаряжение и страховочные системы
- Работы в любых погодных условиях
- Без строительства лесов - экономия до 70%

## Виды работ

- Мойка и очистка фасадов
- Герметизация межпанельных швов
- Установка и демонтаж рекламных конструкций
- Обследование и диагностика зданий
- Покраска фасадов
- Остекление и замена окон

## Безопасность

- Страхование каждого альпиниста
- Двойные страховочные системы
- Ежедневная проверка снаряжения
- Соблюдение всех норм охраны труда`
    }
  ];

  // Mock cases data
  private static cases: CaseStudy[] = [
    {
      title: "Антикоррозийная защита бизнес-центра в Москве",
      slug: "business-center-moscow",
      excerpt: "Комплексная защита металлоконструкций 32-этажного бизнес-центра с применением современных технологий пескоструйной обработки и двухкомпонентных систем покрытий.",
      content: `Проект включал в себя полную антикоррозийную защиту металлоконструкций нового бизнес-центра общей площадью более 150,000 м².

Выполненные работы:
- Пескоструйная обработка до степени Sa 2.5
- Нанесение грунтовочных составов методом безвоздушного распыления
- Финишное покрытие эпоксидными эмалями
- Контроль качества с применением толщиномеров

Проект был завершен в срок с соблюдением всех требований заказчика и строительных норм.`,
      category: "Антикоррозийная защита",
      cover: "/images/placeholders/case-placeholder.webp",
      location: "Москва",
      team_size: 15,
      duration: "4 месяца",
      client: "ООО 'СтройИнвест'",
      updatedAt: "2025-09-10"
    },
    {
      title: "Реконструкция моста в Санкт-Петербурге",
      slug: "bridge-spb",
      excerpt: "Высотные работы по реконструкции автомобильного моста с применением промышленного альпинизма для доступа к труднодоступным участкам конструкций.",
      content: `Масштабный проект по реконструкции автомобильного моста через Неву с использованием технологий промышленного альпинизма.

Особенности проекта:
- Работы на высоте до 45 метров
- Сложные погодные условия
- Ограниченное время на выполнение работ
- Высокие требования к безопасности

Все работы были выполнены с применением сертифицированного альпинистского снаружения и под контролем опытных руководителей работ.`,
      category: "Промышленный альпинизм",
      cover: "/images/placeholders/case-placeholder.webp",
      location: "Санкт-Петербург",
      team_size: 8,
      duration: "2 месяца",
      client: "Комитет по развитию транспортной инфраструктуры",
      updatedAt: "2025-08-15"
    }
  ];

  static async getServices(): Promise<Service[]> {
    return this.services;
  }

  static async getServiceBySlug(slug: string): Promise<Service | null> {
    return this.services.find(service => service.slug === slug) || null;
  }

  static async createService(service: Omit<Service, 'updatedAt'>): Promise<Service> {
    const newService: Service = {
      ...service,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    this.services.push(newService);
    return newService;
  }

  static async updateService(slug: string, updates: Partial<Service>): Promise<Service | null> {
    const index = this.services.findIndex(s => s.slug === slug);
    if (index === -1) return null;
    
    this.services[index] = {
      ...this.services[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    return this.services[index];
  }

  static getCategories(): string[] {
    return [...new Set(this.services.map(s => s.category))];
  }

  // Case studies methods
  static getCases(): CaseStudy[] {
    return this.cases;
  }

  static getCaseBySlug(slug: string): CaseStudy | null {
    return this.cases.find(caseStudy => caseStudy.slug === slug) || null;
  }

  static async createCase(caseStudy: Omit<CaseStudy, 'updatedAt'>): Promise<CaseStudy> {
    const newCase: CaseStudy = {
      ...caseStudy,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    this.cases.push(newCase);
    return newCase;
  }

  static async updateCase(slug: string, updates: Partial<CaseStudy>): Promise<CaseStudy | null> {
    const index = this.cases.findIndex(caseStudy => caseStudy.slug === slug);
    if (index === -1) return null;
    
    this.cases[index] = {
      ...this.cases[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    return this.cases[index];
  }
}