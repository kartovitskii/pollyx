# 🚀 Pollyx

**Pollyx** — библиотека для поллинга с поддержкой WebSocket fallback, умными diff-обновлениями и адаптерами для популярных фреймворков.

[![npm version](https://img.shields.io/npm/v/pollyx.svg)](https://www.npmjs.com/package/pollyx)
[![downloads](https://img.shields.io/npm/dm/pollyx.svg)](https://www.npmjs.com/package/pollyx)
[![license](https://img.shields.io/npm/l/pollyx)](https://github.com/kartovitskii/pollyx/blob/master/LICENSE)

## 💥 Сценарии использования 
#### E-commerce и маркетплейсы
- Обновление цен и остатков товаров в реальном времени
- Актуализация статуса заказов
- Обновление рейтингов и отзывов

#### Дашборды и аналитика
- Мониторинг метрик в реальном времени
- Обновление графиков и статистики
- Системы оповещений

#### Совместная работа
- Редактирование документов
- Обновление комментариев
- Системы тикетов

## ✨ Особенности

- **Гибкий поллинг** — настраиваемые интервалы, методы запросов, заголовки
- **WebSocket с fallback** — автоматическое переключение на polling при проблемах
- **Diff-обновления** — использует `diff-match-patch` для эффективного обновления DOM
- **Умные повторные попытки** — exponential backoff с jitter
- **Дедупликация запросов** — предотвращает множественные одновременные запросы
- **Адаптеры для фреймворков** — поддержка React и Vue 3
- **Visibility API** — останавливает поллинг в неактивных вкладках
- **Глобальные обработчики** — динамическое добавление обработчиков
- **Режим отладки** — подробное логирование всех операций
- **Сохранение состояния** — фокус и выделение текста при обновлениях

## 📦 Установка

```bash
npm install pollyx
# или
yarn add pollyx
# или
pnpm add pollyx
```
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js"></script>
    <script src="dist/pollyx.umd.js"></script>
</head>
<body>
<div id="polling-container">
    <!-- Сюда будут приходить обновления -->
    <div id="content">Загрузка...</div>
</div>

<script>
    // Pollyx доступен глобально как window.Pollyx
    const { Pollyx } = window.Pollyx;

    // Создаем элемент для поллинга
    const container = document.getElementById('polling-container');

    // Инициализируем поллинг
    const polling = new Pollyx(container, {
        interval: 5000,
        url: '/api/updates',
        onUpdate: (html) => {
            console.log('Обновлено!');
        }
    });

    // Управление
    // polling.start();
    // polling.stop();
</script>
</body>
</html>
```

## 🚀 Быстрый старт

### Базовое использование

```javascript
import { Pollyx } from 'pollyx';

const element = document.getElementById('polling-element');
const polling = new Pollyx(element, {
    interval: 30000,
    url: '/api/updates',
    onUpdate: (html) => {
        console.log('Обновлено!', html);
    }
});

// Управление
polling.start();
polling.stop();
polling.destroy();
```

### React

```jsx
import { usePolling } from 'pollyx/react';

function MyComponent() {
    const { data, isFetching, error, refetch } = usePolling({
        url: '/api/poll',
        interval: 10000
    });

    if (error) return <div>Ошибка: {error.message}</div>;
    if (isFetching) return <div>Загрузка...</div>;

    return (
        <div dangerouslySetInnerHTML={{ __html: data }} />
    );
}
```

### Vue 3

```vue
<template>
    <div v-html="data" />
</template>

<script setup>
    import { usePollingVue } from 'pollyx/vue';
    
    const { data, isFetching, error } = usePollingVue({
        url: '/api/updates',
        interval: 5000
    });
</script>
```

## ⚙️ Конфигурация

### Полный список опций

```javascript
const polling = new Pollyx(element, {
    // Основные настройки
    interval: 60000,               // Интервал поллинга (мс)
    url: '/api/updates',           // URL для запросов
    method: 'GET',                 // HTTP метод
    headers: {                     // Заголовки
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/html'
    },

    // Настройки повторных попыток
    retry: {
        maxAttempts: 3,             // Максимум попыток
        baseDelay: 1000,            // Начальная задержка (мс)
        maxDelay: 30000,            // Максимальная задержка (мс)
        factor: 2,                  // Множитель задержки
        jitter: true                // Случайная вариация
    },
    
    // WebSocket настройки
    websocket: {
        enabled: true,               // Включить WebSocket
        url: 'wss://example.com/ws', // WebSocket URL
        fallbackAfter: 3,            // Переключиться на polling после N ошибок
        reconnectInterval: 5000      // Интервал переподключения (мс)
    },
    
    // Дополнительные функции
    deduplicate: true,               // Дедупликация запросов
    diffUpdates: true,               // Diff-обновления
    preserveFocus: true,             // Сохранять фокус при обновлениях
    autoStart: true,                 // Автоматический старт
    debug: false,                    // Режим отладки
    
    // Колбэки
    onUpdate: (html, instance) => {},
    onError: (error, instance) => {},
    onStatusChange: (status, data, instance) => {}
});
```

## 🎯 Продвинутые возможности

### Глобальные обработчики

```javascript
// Регистрация обработчика
Pollyx.registerHandler('specificHandler', (newHtml, oldHtml, instance, diff) => {
    console.log('Специфичная логика', diff);
});

// В HTML
<div data-pollyx data-pollyx-handler="specificHandler"></div>
```

### WebSocket с автоматическим fallback

```javascript
const polling = new Pollyx(element, {
    interval: 30000, // Резервный polling если WebSocket упадет
    websocket: {
        enabled: true,
        url: 'wss://api.example.com/ws',
        fallbackAfter: 3 // Переключиться на polling после 3 ошибок WS
    }
});
```

### Работа с diff-обновлениями

```javascript
// Получение отчета об изменениях
polling.on('diff_applied', (statistics) => {
    console.log(`Применено ${statistics.patchesCount} патчей`);
    console.log(`${statistics.failedPatches} патчей не применились`);
});
```

### Динамическое добавление обработчиков

```javascript
// Обработчик можно добавить после инициализации
setTimeout(() => {
    polling.registerHandler('newFeature', (newHtml, oldHtml) => {
        console.log('Новый обработчик!');
        // Ваша логика
    });
}, 5000);
```

### Управление несколькими инстансами

```javascript
// Остановить все
Pollyx.stopAll();

// Стартовать все
Pollyx.startAll();

// Уничтожить все
Pollyx.destroyAll();

// Получить все инстансы
const instances = Pollyx.getAllInstances();
```

## 📊 События

```javascript
element.addEventListener('pollyx:status', (event) => {
    const { status, instance, timestamp, ...data } = event.detail;

    switch(status) {
        case 'started':
            console.log('Поллинг запущен');
            break;
        case 'stopped':
            console.log('Поллинг остановлен');
            break;
        case 'fetching':
            console.log('Выполняется запрос...');
            break;
        case 'success':
            console.log('Запрос успешен');
            break;
        case 'error':
            console.log('Ошибка:', data.error);
            break;
        case 'retrying':
            console.log(`Попытка ${data.attempt}, задержка ${data.delay}мс`);
            break;
        case 'diff_applied':
            console.log('Применен diff:', data);
            break;
        case 'handler_registered':
            console.log('Зарегистрирован обработчик:', data.name);
            break;
        case 'ws_fallback':
            console.log('Переключение на polling из-за ошибок WebSocket');
            break;
    }
});
```

## 🔁 Умные повторные попытки

Pollyx использует встроенный `RetryStrategy` для управления повторными попытками при ошибках.

### Состояние и сброс

Каждый экземпляр `RetryStrategy` хранит состояние попыток и позволяет его сбрасывать:

```javascript
import { RetryStrategy } from 'pollyx';

const retry = new RetryStrategy({
    maxAttempts: 3,
    baseDelay: 1000,
    factor: 2
});

// Проверяем нужно ли повторить
if (retry.shouldRetry(attempt, error)) {
    const delay = retry.getDelayForAttempt(attempt);
    await new Promise(resolve => setTimeout(resolve, delay));
}

// Получаем текущее состояние
const state = retry.getState();
console.log(state);
// {
//   attempt: 0,
//   lastAttempt: 1,
//   lastError: Error,
//   lastDelay: 2000,
//   exceededMaxAttempts: false,
//   aborted: false,
//   startTime: 1678900000000
// }

// Сброс для новой серии попыток
retry.reset();

// Проверка, был ли сброс
if (retry.isReset()) {
    console.log('Готов к новой серии попыток');
}

// Частичный сброс (сохраняет startTime)
retry.resetAttempts();
```

## ⭐ Поддержка проекта

Если вам нравится Pollyx, поставьте звезду на GitHub и поделитесь с коллегами!

---

Сделано с ❤️ для сообщества