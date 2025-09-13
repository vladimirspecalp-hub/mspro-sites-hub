// OpenAI Integration for Agent Tasks

export interface OpenAIConfig {
  apiKey: string;
  baseUrl?: string;
  model: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GenerationRequest {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIClient {
  private config: OpenAIConfig;

  constructor(config?: Partial<OpenAIConfig>) {
    this.config = {
      apiKey: config?.apiKey || import.meta.env.VITE_OPENAI_API_KEY || '',
      baseUrl: config?.baseUrl || import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: config?.model || import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'
    };
  }

  async generateText(request: GenerationRequest): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw error;
    }
  }

  // Generate service content from brief
  async generateServiceContent(brief: {
    title: string;
    category: string;
    description?: string;
    keywords?: string[];
  }): Promise<{
    title: string;
    excerpt: string;
    content: string;
    faq: Array<{q: string; a: string}>;
  }> {
    const systemMessage = `Ты эксперт по промышленному альпинизму и антикоррозийной защите. 
Создай профессиональный контент для услуги в формате MDX.
Стиль: корпоративный B2B, технические детали, экспертность.
Целевая аудитория: руководители предприятий, технические директора.`;

    const userMessage = `Создай контент для услуги:
Название: ${brief.title}
Категория: ${brief.category}
Описание: ${brief.description || 'Не указано'}
Ключевые слова: ${brief.keywords?.join(', ') || 'Не указаны'}

Верни JSON с полями:
- title: оптимизированное название (до 60 символов)
- excerpt: краткое описание (до 160 символов) 
- content: полный контент с разделами ## Преимущества, ## Технология работ, ## Этапы, ## Гарантии (markdown)
- faq: массив из 5 вопросов-ответов [{q: "вопрос", a: "ответ"}]`;

    try {
      const response = await this.generateText({
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        maxTokens: 3000
      });

      return JSON.parse(response);
    } catch (error) {
      console.error('Error generating service content:', error);
      throw error;
    }
  }

  // Optimize existing content for SEO
  async optimizeContent(content: string, keywords: string[]): Promise<string> {
    const systemMessage = `Ты SEO-эксперт по промышленному альпинизму. 
Оптимизируй контент для поисковых систем, сохраняя естественность и экспертность.`;

    const userMessage = `Оптимизируй текст для ключевых слов: ${keywords.join(', ')}

Исходный текст:
${content}

Требования:
- Сохрани техническую точность
- Естественно интегрируй ключевые слова
- Улучши читаемость
- Добавь призывы к действию`;

    return await this.generateText({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.5
    });
  }

  // Generate meta description
  async generateMetaDescription(title: string, content: string): Promise<string> {
    const response = await this.generateText({
      messages: [
        {
          role: 'system',
          content: 'Создай SEO-описание до 160 символов для страницы услуги'
        },
        {
          role: 'user',
          content: `Название: ${title}\nКонтент: ${content.slice(0, 500)}`
        }
      ],
      temperature: 0.3,
      maxTokens: 100
    });

    return response.slice(0, 160);
  }
}

// Export singleton instance
export const openai = new OpenAIClient();