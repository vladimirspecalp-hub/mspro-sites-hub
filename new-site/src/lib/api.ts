// API Mock Layer - In production, replace with actual API calls

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface AgentTaskRequest {
  type: 'new_service' | 'update_service' | 'new_case' | 'update_content';
  payload: Record<string, any>;
  token: string;
}

export interface APIResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

class APIClient {
  private baseUrl = '/api';
  
  async submitContactForm(data: ContactFormData): Promise<APIResponse> {
    // Mock implementation - replace with actual fetch
    console.log('Submitting contact form:', data);
    
    // Validate required fields
    if (!data.name || !data.phone) {
      return { ok: false, error: 'Имя и телефон обязательны' };
    }
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful submission
    return { ok: true, data: { message: 'Заявка успешно отправлена' } };
  }

  async submitAgentTask(task: AgentTaskRequest): Promise<APIResponse> {
    console.log('Submitting agent task:', task);
    
    // Validate token
    const expectedToken = import.meta.env.VITE_AGENT_TOKEN || 'changeme';
    if (task.token !== expectedToken) {
      return { ok: false, error: 'Invalid token' };
    }
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (task.type) {
      case 'new_service':
        return this.createService(task.payload);
      case 'update_service':
        return this.updateService(task.payload);
      default:
        return { ok: false, error: 'Unsupported task type' };
    }
  }

  private async createService(payload: any): Promise<APIResponse> {
    // Mock service creation
    const service = {
      id: Date.now().toString(),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return {
      ok: true,
      data: {
        message: 'Service created successfully',
        service
      }
    };
  }

  private async updateService(payload: any): Promise<APIResponse> {
    // Mock service update
    return {
      ok: true,
      data: {
        message: 'Service updated successfully',
        serviceId: payload.id || payload.slug
      }
    };
  }

  // Email integration (mock)
  async sendEmail(to: string, subject: string, body: string): Promise<APIResponse> {
    console.log('Sending email:', { to, subject, body });
    
    // In production, integrate with SMTP service
    const smtpConfig = {
      host: import.meta.env.VITE_SMTP_HOST,
      port: import.meta.env.VITE_SMTP_PORT,
      user: import.meta.env.VITE_SMTP_USER,
      pass: import.meta.env.VITE_SMTP_PASS
    };
    
    if (!smtpConfig.host) {
      console.warn('SMTP not configured');
      return { ok: true, data: { message: 'Email queued (SMTP not configured)' } };
    }
    
    return { ok: true, data: { message: 'Email sent successfully' } };
  }

  // Telegram integration (mock)
  async sendTelegramMessage(message: string): Promise<APIResponse> {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn('Telegram not configured');
      return { ok: true, data: { message: 'Message queued (Telegram not configured)' } };
    }
    
    console.log('Sending Telegram message:', message);
    
    // Mock Telegram API call
    return { ok: true, data: { message: 'Telegram message sent' } };
  }

  // Sitemap generation
  generateSitemap(): string {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://mspro.ru';
    const now = new Date().toISOString().split('T')[0];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/antikorroziya</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services/promyshlenniy-alpinizm</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contacts</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  }

  // Robots.txt generation
  generateRobots(): string {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://mspro.ru';
    
    return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;
  }
}

export const api = new APIClient();