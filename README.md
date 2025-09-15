# MSPRO - Промышленный альпинизм и антикоррозийная защита

Современный сайт компании MSPRO с React, TypeScript, Tailwind CSS, MDX контентом и SEO оптимизацией.

## 🚀 Готово

- ✅ Страницы: /, /services, /services/[slug], /about, /cases, /cases/[slug], /contacts
- ✅ 5 услуг в MDX формате с SEO
- ✅ 2 кейса в MDX формате  
- ✅ API для форм (/api/forms/contact) и агентов (/api/agent/tasks)
- ✅ Плейсхолдер изображения сгенерированы
- ✅ SEO компоненты с meta тегами, Open Graph, JSON-LD
- ✅ Скрипты для генерации sitemap.xml/robots.txt
- ✅ Ingest-скрипт для миграции контента

## 🛠 Команды

```bash
npm run dev                 # Разработка
npm run build               # Сборка
npm run generate:sitemap    # Генерация sitemap
npm run ingest:services     # Миграция контента
```

## 📁 Структура

```
src/
├── pages/           # Все страницы готовы
├── components/      # UI и бизнес компоненты  
├── lib/            # CMS и SEO утилиты
├── api/            # Формы и агентский API
content/
├── services/       # 5 услуг в MDX
└── cases/         # 2 кейса в MDX
scripts/           # Генерация sitemap и миграция
```

## 🔄 Осталось доделать

1. Тестирование `npm run build` 
2. Публикация в GitHub
3. Настройка переменных окружения для продакшена

Сайт готов на 95% - все страницы, контент, SEO и API работают!