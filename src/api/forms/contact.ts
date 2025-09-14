// API endpoint для обработки контактных форм
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  service?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<{ ok: boolean; message?: string }> => {
  try {
    // Валидация honeypot (антибот)
    const honeypot = (document.querySelector('input[name="website"]') as HTMLInputElement)?.value;
    if (honeypot) {
      return { ok: false, message: 'Spam detected' };
    }

    // Симуляция отправки (в реальном проекте здесь будет SMTP/Telegram API)
    const response = await fetch('/api/forms/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: Date.now(),
        source: 'mspro-site'
      })
    });

    if (response.ok) {
      return { ok: true, message: 'Сообщение отправлено успешно!' };
    } else {
      throw new Error('Server error');
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return { ok: false, message: 'Ошибка отправки. Попробуйте позже.' };
  }
};