const fs = require('fs');
const path = require('path');

// Import the CMS data - this would need to be adapted for the actual structure
const siteUrl = 'https://mspro.ru';

// Mock data for now - replace with actual CMS calls
const services = [
  { slug: 'antikorroziya', updatedAt: '2025-09-13' },
  { slug: 'promyshlenniy-alpinizm', updatedAt: '2025-09-13' },
  { slug: 'germetizaciya', updatedAt: '2025-09-13' },
  { slug: 'fasad-cleaning', updatedAt: '2025-09-13' },
  { slug: 'remont-krovli', updatedAt: '2025-09-13' }
];

const cases = [
  { slug: 'business-center-moscow', updatedAt: '2025-09-10' },
  { slug: 'bridge-spb', updatedAt: '2025-08-15' }
];

function generateSitemap() {
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/services', changefreq: 'weekly', priority: '0.9' },
    { url: '/cases', changefreq: 'weekly', priority: '0.8' },
    { url: '/contacts', changefreq: 'monthly', priority: '0.7' }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add service pages
  services.forEach(service => {
    sitemap += `
  <url>
    <loc>${siteUrl}/services/${service.slug}</loc>
    <lastmod>${service.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add case pages
  cases.forEach(caseStudy => {
    sitemap += `
  <url>
    <loc>${siteUrl}/cases/${caseStudy.slug}</loc>
    <lastmod>${caseStudy.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('✅ Robots.txt generated successfully!');
}

// Run both generators
if (require.main === module) {
  generateSitemap();
  generateRobots();
}

module.exports = { generateSitemap, generateRobots };