import { useEffect } from 'react';
import { SEOData, updateMetaTags } from '@/lib/seo';

interface MetaProps {
  seo: SEOData;
}

export function Meta({ seo }: MetaProps) {
  useEffect(() => {
    updateMetaTags(seo);
  }, [seo]);

  return null; // This component only manages meta tags
}

export function DefaultMeta() {
  const defaultSEO: SEOData = {
    title: 'MSPRO - Промышленный альпинизм и антикоррозийная защита',
    description: 'Профессиональные услуги промышленного альпинизма, антикоррозийной защиты металлоконструкций, высотные работы в Москве и регионах.',
    canonical: import.meta.env.VITE_SITE_URL || 'https://mspro.ru',
    ogImage: '/images/og-default.webp',
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'MSPRO',
      'url': import.meta.env.VITE_SITE_URL || 'https://mspro.ru',
      'description': 'Промышленный альпинизм и антикоррозийная защита металлоконструкций',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'RU'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+7 (495) 000-00-00',
        'contactType': 'customer service'
      }
    }
  };

  return <Meta seo={defaultSEO} />;
}