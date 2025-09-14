// API для работы с агентскими задачами (создание/обновление услуг)
export interface AgentTask {
  type: 'new_service' | 'update_service' | 'new_case';
  payload: {
    title: string;
    slug: string;
    category: string;
    content: string;
    excerpt?: string;
    faq?: Array<{ q: string; a: string }>;
    [key: string]: any;
  };
}

export interface AgentResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export const processAgentTask = async (task: AgentTask, token: string): Promise<AgentResponse> => {
  try {
    // Проверка токена агента
    const expectedToken = import.meta.env.VITE_AGENT_TOKEN || 'changeme';
    if (token !== expectedToken) {
      return { ok: false, message: 'Invalid agent token' };
    }

    // Логирование задачи
    const logEntry = {
      timestamp: new Date().toISOString(),
      task: task.type,
      slug: task.payload.slug,
      status: 'processing'
    };
    console.log('Agent task:', logEntry);

    // В реальном проекте здесь будет создание MDX файлов
    switch (task.type) {
      case 'new_service':
        // Создание нового MDX файла услуги
        const serviceContent = generateServiceMDX(task.payload);
        // await fs.writeFile(`content/services/${task.payload.slug}.mdx`, serviceContent);
        break;
      
      case 'update_service':
        // Обновление существующего файла
        break;
      
      case 'new_case':
        // Создание нового кейса
        break;
    }

    return { 
      ok: true, 
      message: `Task ${task.type} completed successfully`,
      data: { slug: task.payload.slug }
    };

  } catch (error) {
    console.error('Agent task error:', error);
    return { ok: false, message: 'Task processing failed' };
  }
};

const generateServiceMDX = (payload: any): string => {
  const frontmatter = `---
title: "${payload.title}"
slug: "${payload.slug}"
excerpt: "${payload.excerpt || ''}"
category: "${payload.category}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
---`;

  return `${frontmatter}\n\n${payload.content}`;
};