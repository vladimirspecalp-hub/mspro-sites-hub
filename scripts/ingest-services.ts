#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import matter from 'gray-matter';

interface ParsedService {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover?: string;
  gallery?: string[];
  price?: string;
}

export class ServiceIngester {
  private inputDir: string;
  private outputDir: string;

  constructor(inputDir = 'public_html', outputDir = 'content/services') {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
  }

  async ingestAll() {
    console.log('🚀 Starting service ingestion...');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // For now, generate mock services since we don't have the HTML files
    const services = this.generateMockServices();
    
    for (const service of services) {
      await this.createMDXFile(service);
    }

    console.log(`✅ Successfully ingested ${services.length} services!`);
  }

  private generateMockServices(): ParsedService[] {
    return [
      {
        title: "Антикоррозийная защита металлоконструкций",
        slug: "antikorroziya",
        category: "Антикор",
        excerpt: "Промышленная окраска, пескоструй, огнезащита, высотные работы.",
        content: `## Профессиональная антикоррозийная защита

Наша компания предоставляет полный комплекс услуг по антикоррозийной защите металлоконструкций:

### Технологии работ
- Пескоструйная обработка до степени Sa 2.5
- Нанесение грунтовочных составов
- Финишное покрытие эпоксидными эмалями
- Контроль качества толщиномером

### Гарантии
- Гарантия на материалы до 15 лет
- Гарантия на работы 2 года
- Страхование объектов до 10 млн рублей`,
        cover: "/images/placeholders/service-placeholder.webp",
        price: "От 490 ₽/м²"
      },
      {
        title: "Промышленный альпинизм",
        slug: "alpinizm",
        category: "Высотные работы", 
        excerpt: "Высотные работы любой сложности: мойка фасадов, монтаж, обследование.",
        content: `## Промышленный альпинизм

Выполняем высотные работы любой сложности с соблюдением всех требований безопасности.

### Виды работ
- Мойка и очистка фасадов
- Герметизация межпанельных швов
- Установка рекламных конструкций
- Обследование зданий
- Покраска на высоте

### Преимущества
- Сертифицированные специалисты
- Собственное снаряжение
- Работы без лесов - экономия до 70%
- Страхование всех работников`,
        cover: "/images/placeholders/service-placeholder.webp",
        price: "От 350 ₽/м²"
      }
    ];
  }

  private async createMDXFile(service: ParsedService) {
    const frontmatter = {
      title: service.title,
      slug: service.slug,
      excerpt: service.excerpt,
      category: service.category,
      cover: service.cover,
      gallery: service.gallery || [],
      faq: [
        {
          q: "Какие технологии применяете?",
          a: "Современные технологии с соблюдением всех стандартов качества."
        },
        {
          q: "Предоставляете ли гарантию?",
          a: "Да, предоставляем гарантию на все виды выполненных работ."
        }
      ],
      price_note: service.price,
      schema: { type: "Service" },
      updatedAt: new Date().toISOString().split('T')[0]
    };

    const fileContent = matter.stringify(service.content, frontmatter);
    const filePath = path.join(this.outputDir, `${service.slug}.mdx`);
    
    fs.writeFileSync(filePath, fileContent);
    console.log(`📝 Created: ${filePath}`);
  }

  // Future method for parsing HTML files when available
  private async parseHTMLService(htmlPath: string): Promise<ParsedService> {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract service data from HTML
    const title = document.querySelector('h1')?.textContent?.trim() || 'Untitled Service';
    const content = document.querySelector('.content, .main-content')?.textContent?.trim() || '';
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Extract images
    const images = Array.from(document.querySelectorAll('img'))
      .map(img => img.getAttribute('src'))
      .filter(src => src && !src.includes('placeholder'));

    // Extract price if available
    const price = this.extractPrice(html);

    return {
      title,
      slug,
      category: 'Услуги', // Default category
      excerpt: content.substring(0, 160) + '...',
      content,
      cover: images[0],
      gallery: images.slice(1),
      price
    };
  }

  private extractPrice(html: string): string | undefined {
    const priceRegex = /(\d+[\s\d]*)\s*(?:₽|руб|рублей?)/gi;
    const match = html.match(priceRegex);
    return match ? `От ${match[0]}` : undefined;
  }
}

// CLI execution
if (require.main === module) {
  const ingester = new ServiceIngester();
  ingester.ingestAll().catch(console.error);
}

export default ServiceIngester;