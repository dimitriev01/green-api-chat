# GREEN-API MAX Chat

Минимальный React-интерфейс для отправки и получения текстовых сообщений в MAX через GREEN-API.

Проект выполнен в рамках тестового задания на позицию Frontend React Developer.

## Возможности

- авторизация через GREEN-API instance
- поиск получателя по номеру телефона
- один активный чат
- отправка текстовых сообщений через `SendMessage`
- получение входящих сообщений через `ReceiveNotification`
- подтверждение обработки уведомлений через `DeleteNotification`
- автоскролл к последнему сообщению
- защита от дублирования сообщений
- хранение credentials только в рамках текущей вкладки
- обработка API-ошибок
- адаптивный интерфейс в стилистике MAX

## Стек

- React
- TypeScript
- Vite
- Zustand
- Axios
- SCSS Modules
- Vitest
- React Testing Library
- ESLint
- Prettier

## Архитектура

Проект построен на облегчённом варианте Feature-Sliced Design.

Направление зависимостей:

```text
app
↓
pages
↓
features
↓
entities
↓
shared
```
