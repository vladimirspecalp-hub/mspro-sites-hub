# MSPRO New Site - React Migration

Современный фронтенд для MSPRO с поддержкой автоматизации контента через ИИ-агентов.

## Технологии
- React 18 + TypeScript
- Vite + React Router
- TailwindCSS
- MDX для контента
- Framer Motion для анимаций

## Структура проекта
```
new-site/
  src/
    components/
      ui/           # UI компоненты
      seo/          # SEO компоненты
      blocks/       # Готовые блоки (Hero, Benefits, etc.)
    pages/          # Страницы
    content/        # MDX контент
      services/     # Услуги
      cases/        # Кейсы
    lib/            # Утилиты
      cms.ts        # Работа с контентом
      seo.ts        # SEO утилиты
      ai/           # ИИ интеграции
    api/            # API эндпоинты (mock)
```

## Команды
```bash
npm run dev         # Разработка
npm run build       # Сборка
npm run preview     # Предпросмотр сборки
npm run lint        # Линтинг
npm run ingest      # Парсинг старого контента
```

## Переменные окружения
Скопируйте `.env.example` в `.env` и заполните необходимые ключи.

## API для агентов
POST `/api/agent/tasks` - создание/обновление контента
POST `/api/forms/contact` - отправка заявок

## Контент
Услуги хранятся в `src/content/services/*.mdx` с фронтматтером:
```yaml
---
title: "Название услуги"
slug: "slug"
category: "Категория"
excerpt: "Краткое описание"
cover: "/images/services/cover.webp"
price_note: "От 490 ₽/м²"
---
```