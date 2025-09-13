import { Service } from './cms';

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
  noindex?: boolean;
}

export class SEOManager {
  private static siteUrl = import.meta.env.VITE_SITE_URL || 'https://mspro.ru';
  private static siteName = import.meta.env.VITE_SITE_NAME || 'MSPRO';

  static generateServiceSEO(service: Service): SEOData {
    const title = `${service.title} в ${service.city_targets?.[0] || 'России'} | ${this.siteName}`;
    const description = `${service.excerpt} ${service.price_note || ''} Профессиональные услуги от экспертов MSPRO.`;
    
    return {
      title: title.slice(0, 60),
      description: description.slice(0, 160),
      canonical: `${this.siteUrl}/services/${service.slug}`,
      ogImage: service.cover,
      ogType: 'article',
      schema: this.generateServiceSchema(service)
    };
  }

  static generatePageSEO(
    title: string, 
    description: string, 
    path: string = '',
    ogImage?: string
  ): SEOData {
    return {
      title: `${title} | ${this.siteName}`,
      description: description.slice(0, 160),
      canonical: `${this.siteUrl}${path}`,
      ogImage: ogImage || '/images/og-default.webp',
      ogType: 'website'
    };
  }

  private static generateServiceSchema(service: Service) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': service.title,
      'description': service.excerpt,
      'provider': {
        '@type': 'Organization',
        'name': 'MSPRO',
        'url': this.siteUrl,
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'RU'
        }
      },
      'areaServed': service.city_targets?.map(city => ({
        '@type': 'City',
        'name': city
      })),
      'offers': service.price_note ? {
        '@type': 'Offer',
        'description': service.price_note,
        'priceCurrency': 'RUB'
      } : undefined
    };
  }

  static generateBreadcrumbs(items: Array<{name: string, url?: string}>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url ? `${this.siteUrl}${item.url}` : undefined
      }))
    };
  }

  static generateFAQSchema(faq: Array<{q: string, a: string}>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faq.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };
  }
}

export const updateMetaTags = (seoData: SEOData) => {
  // Update document title
  document.title = seoData.title;
  
  // Update meta tags
  const updateMeta = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  updateMeta('description', seoData.description);
  updateMeta('og:title', seoData.title, true);
  updateMeta('og:description', seoData.description, true);
  updateMeta('og:type', seoData.ogType || 'website', true);
  
  if (seoData.ogImage) {
    updateMeta('og:image', seoData.ogImage, true);
  }
  
  if (seoData.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seoData.canonical;
  }

  // Add JSON-LD schema
  if (seoData.schema) {
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(seoData.schema);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(seoData.schema);
      document.head.appendChild(schemaScript);
    }
  }

  // Noindex
  if (seoData.noindex) {
    updateMeta('robots', 'noindex,nofollow');
  } else {
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.remove();
  }
};