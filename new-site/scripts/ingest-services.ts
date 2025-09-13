#!/usr/bin/env ts-node
/**
 * Service Migration Script
 * Парсит старые HTML страницы услуг и создает MDX файлы
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

interface ParsedService {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  images: string[];
  price?: string;
}

class ServiceIngester {
  private inputDir = path.join(__dirname, '../../../public_html');
  private outputDir = path.join(__dirname, '../src/content/services');

  constructor() {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async ingestAll(): Promise<void> {
    console.log('🚀 Starting service ingestion...');
    
    // Mock service data for demonstration
    const mockServices = await this.generateMockServices();
    
    for (const service of mockServices) {
      await this.createMDXFile(service);
    }
    
    console.log(`✅ Ingested ${mockServices.length} services successfully!`);
  }

  private async generateMockServices(): Promise<ParsedService[]> {
    return [
      {
        title: "Высотная покраска фасадов",
        slug: "vysotniaya-pokraska-fasadov",
        category: "Высотные работы",
        excerpt: "Профессиональная покраска фасадов зданий методом промышленного альпинизма без лесов и подъемников.",
        content: `## Преимущества высотной покраски

- Работы без строительных лесов - экономия до 60%
- Минимальные сроки выполнения - от 3 дней
- Любая высота и сложность архитектуры
- Экологически чистые материалы

## Технология работ

Применяем современные альпинистские технологии с использованием сертифицированного снаряжения. Все работы выполняются в строгом соответствии с требованиями охраны труда.

## Этапы выполнения

1. **Обследование фасада** - оценка состояния поверхности, выбор материалов
2. **Подготовка поверхности** - очистка, грунтование, заделка трещин
3. **Нанесение покрытий** - в 2-3 слоя с контролем качества
4. **Финишные работы** - уборка территории, сдача объекта

## Гарантии

- Гарантия на покрытие до 8 лет
- Страхование ответственности
- Сертификаты на все материалы`,
        images: [
          "/images/services/pokraska/1.webp",
          "/images/services/pokraska/2.webp"
        ],
        price: "От 280 ₽/м²"
      },
      {
        title: "Герметизация межпанельных швов",
        slug: "germetizatsiya-shvov",
        category: "Высотные работы", 
        excerpt: "Герметизация и утепление межпанельных швов современными материалами для защиты от промерзания и протечек.",
        content: `## Преимущества герметизации швов

- Устранение промерзаний и сквозняков
- Защита от атмосферных осадков
- Современные герметики с гарантией до 25 лет
- Энергосбережение до 30%

## Технология работ

Используем профессиональные герметики на основе полиуретана и силикона, устойчивые к UV-излучению и температурным перепадам.

## Этапы выполнения

1. **Демонтаж старого герметика** - полная очистка швов
2. **Подготовка поверхности** - обеспыливание, грунтование
3. **Укладка утеплителя** - энергосберегающие материалы
4. **Нанесение герметика** - в 2 слоя с армированием
5. **Контроль качества** - проверка адгезии и герметичности

## Гарантии

- Гарантия на герметизацию до 10 лет
- Материалы ведущих европейских производителей
- Полное страхование работ`,
        images: [
          "/images/services/germetik/1.webp",
          "/images/services/germetik/2.webp"
        ],
        price: "От 450 ₽/п.м"
      },
      {
        title: "Мойка фасадов и остекления",
        slug: "moyka-fasadov-ostekleniya",
        category: "Клининг",
        excerpt: "Профессиональная мойка фасадов, витражей и остекления высотных зданий с применением альпинистского снаряжения.",
        content: `## Преимущества профессиональной мойки

- Безопасные экологичные средства
- Удаление любых загрязнений
- Работа на любой высоте
- Регулярное обслуживание по договору

## Технология мойки

Применяем современные моющие средства и технологии очистки, подбираем индивидуальный подход для каждого типа поверхности.

## Виды работ

- Мойка стеклянных фасадов и витражей
- Очистка композитных и металлических панелей
- Удаление высолов и коррозии
- Мойка после строительных работ

## Этапы выполнения

1. **Оценка загрязнений** - подбор оптимальных средств
2. **Предварительная очистка** - удаление грубых загрязнений
3. **Основная мойка** - с применением спецсредств
4. **Ополаскивание** - деминерализованной водой
5. **Сушка и контроль** - проверка качества результата

## Регулярное обслуживание

- Комплексные договоры на год
- Скидки при регулярном обслуживании до 25%
- Экстренные выезды в течение 4 часов`,
        images: [
          "/images/services/moyka/1.webp",
          "/images/services/moyka/2.webp"
        ],
        price: "От 35 ₽/м²"
      }
    ];
  }

  private async createMDXFile(service: ParsedService): Promise<void> {
    const frontmatter = `---
title: "${service.title}"
slug: "${service.slug}"
excerpt: "${service.excerpt}"
category: "${service.category}"
city_targets: ["Москва","СПб","Екатеринбург","Новосибирск"]
cover: "${service.images[0] || '/images/services/default.webp'}"
gallery: [${service.images.map(img => `"${img}"`).join(', ')}]
faq:
  - q: "Какие материалы используете?"
    a: "Работаем только с сертифицированными материалами ведущих производителей с гарантией качества."
  - q: "Есть ли гарантия на работы?"
    a: "Предоставляем гарантию на выполненные работы от 2 до 10 лет в зависимости от вида услуг."
  - q: "Работаете ли в выходные дни?"
    a: "Да, при необходимости можем организовать работы в выходные и праздничные дни."
  - q: "Какие документы предоставляете?"
    a: "Полный пакет документов: акты выполненных работ, гарантийные обязательства, сертификаты материалов."
${service.price ? `price_note: "${service.price}"` : ''}
schema:
  type: "Service"
updatedAt: "${new Date().toISOString().split('T')[0]}"
---

${service.content}
`;

    const filePath = path.join(this.outputDir, `${service.slug}.mdx`);
    fs.writeFileSync(filePath, frontmatter);
    
    console.log(`📄 Created: ${service.slug}.mdx`);
  }

  // Method to parse actual HTML files (when available)
  private parseHTMLService(htmlPath: string): ParsedService | null {
    try {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Extract title
      const title = document.querySelector('h1')?.textContent?.trim() || 
                   document.querySelector('title')?.textContent?.trim() || 
                   'Untitled Service';
      
      // Generate slug from title
      const slug = title.toLowerCase()
        .replace(/[^a-zа-я0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Extract content
      const contentDiv = document.querySelector('.content, .main, article, .service-content');
      const paragraphs = contentDiv?.querySelectorAll('p') || [];
      const headings = contentDiv?.querySelectorAll('h2, h3') || [];
      
      let content = '';
      headings.forEach(heading => {
        content += `## ${heading.textContent?.trim()}\n\n`;
        const nextElements = this.getNextSiblings(heading, ['P', 'UL', 'OL']);
        nextElements.forEach(el => {
          content += `${el.textContent?.trim()}\n\n`;
        });
      });
      
      // Extract images
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src && !src.includes('data:'))
        .slice(0, 3);
      
      // Extract excerpt (first paragraph)
      const excerpt = paragraphs[0]?.textContent?.trim().slice(0, 160) || '';
      
      return {
        title,
        slug,
        category: 'Услуги', // Default category
        excerpt,
        content: content || 'Контент услуги',
        images,
        price: this.extractPrice(html)
      };
      
    } catch (error) {
      console.error(`Error parsing ${htmlPath}:`, error);
      return null;
    }
  }

  private getNextSiblings(element: Element, tagNames: string[]): Element[] {
    const siblings: Element[] = [];
    let next = element.nextElementSibling;
    
    while (next && !tagNames.includes(next.tagName.toUpperCase())) {
      if (tagNames.includes(next.tagName)) {
        siblings.push(next);
      }
      next = next.nextElementSibling;
    }
    
    return siblings;
  }

  private extractPrice(html: string): string | undefined {
    const priceRegex = /(?:от\s+)?(\d+(?:\s?\d+)*)\s*(?:руб|₽|р\.?)/gi;
    const match = html.match(priceRegex);
    return match?.[0];
  }
}

// CLI execution
if (require.main === module) {
  const ingester = new ServiceIngester();
  ingester.ingestAll()
    .then(() => {
      console.log('✨ Service ingestion completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Service ingestion failed:', error);
      process.exit(1);
    });
}

export { ServiceIngester };