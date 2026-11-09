# Праця — базовая версия 0.3

Один проект **Next.js / React / SQLite**, созданный на основе переданного восстановленного архива. Интерфейс на украинском, оригинальный дизайн сохранён. Отдельного NestJS-сервиса нет. Видеозвонков нет. Деплой не настроен и не выполнялся.

## Что работает

- Регистрация, вход, выход, серверные сессии, хеширование паролей scrypt.
- Поиск по профессии/компании, городу, сфере, зарплате, опыту, формату и графику; пагинация.
- Конструктор приватной анкеты: опыт, образование, навыки, контакты.
- Отправка отклика с неизменяемой копией анкеты; повторный запрос не создаёт дубликат.
- История откликов кандидата и статусы `new / viewed / invited / rejected`.
- Кабинет работодателя: вакансии, редактирование, закрытие, повторная отправка на проверку, входящие отклики.
- Один профиль компании на аккаунт: описание, город, сайт и публичная страница.
- Модерация: очередь новых вакансий, одобрение, блокировка, жалобы и журнал решений.
- Публикация новой/изменённой вакансии только после одобрения. Повторное открытие тоже требует проверки. Заблокированную вакансию нельзя разблокировать через редактирование.
- Избранное и сохранённые поиски.
- Серверные страницы вакансий, canonical, JobPosting, sitemap и robots. Закрытые вакансии не попадают в sitemap и не имеют JobPosting.
- Повторяемые миграции и команда резервного копирования БД.

## Быстрый запуск

Нужен Node.js >=22.16 (проверено на 24.22.1).

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Открыть http://localhost:3000. `PRATSIA_ORIGIN` должен точно совпадать с адресом браузера, включая порт. SQLite создастся в `data/pratsia.sqlite`. Архив не содержит аккаунтов, паролей или рабочей базы.

Демонстрационные вакансии можно включить переключателем «Показати приклади». Они помечены и не принимают отклики.

## Первый модератор

1. Зарегистрировать собственный аккаунт через интерфейс.
2. Подтвердить владение почтой через восстановление пароля при настроенной отправке писем. Либо оператор проекта самостоятельно проверяет владельца почтового ящика.
3. Выдать права из терминала:

```bash
npm run moderator -- grant your-email@example.com
# Только если оператор уже проверил владельца почтового ящика вручную:
npm run moderator -- grant your-email@example.com --mailbox-verified-by-operator
```

Повторно войти: появится раздел «Модерація». Это локальная административная команда, а не публичный endpoint. Для отзыва прав: `npm run moderator -- revoke your-email@example.com`.

## Проверка основного сценария

1. Зарегистрировать работодателя. В «Роботодавцям» заполнить «Профіль компанії».
2. Создать вакансию. До одобрения её нет в публичном поиске.
3. Войти модератором, открыть «На перевірці», указать причину и одобрить.
4. Войти другим аккаунтом, заполнить «Моє резюме», найти вакансию и откликнуться.
5. В кабинете работодателя открыть кандидата и поменять статус отклика.
6. Проверить новый статус в «Мої відгуки» кандидата.
7. Закрыть вакансию: новые отклики запрещены, существующая история сохраняется.

## Проверки

```bash
npm test
npm run build
npm run test:http
```

`test:http` запускает production-сборку на localhost:3197, создаёт отдельную временную БД, выполняет HTTP-проверки и удаляет только эту тестовую БД. Перед ним обязателен `npm run build`. Не требуется запускать сервер вручную.

```bash
npm run db:backup
```

Команды CLI не читают `.env.local`. Если меняете каталог БД, экспортируйте абсолютный `PRATSIA_DATA_DIR` в окружение **и для сервера, и для CLI**.

## Границы базовой версии

- Резюме — анкета внутри сайта. Загрузка PDF пока отсутствует.
- Отклики и статусы видны в кабинетах. Email-уведомления об откликах и рассылки пока отсутствуют.
- Сохранён существующий механизм восстановления пароля через sendmail; в примере окружения отправка выключена. Реальная доставка почты не проверена.
- Подтверждение email при регистрации, удаление аккаунта и правила автоматического удаления персональных данных — отдельный следующий этап до публичного запуска.
- Компании могут редактировать свой текстовый профиль; профиль сам по себе не является знаком проверки. Модерируются вакансии.
- Нет платежей, видеосвязи, чатов, AI-подбора и публичной базы кандидатов.
- SQL-поиск из исходного проекта пока использует поиск подстрок; полноценные FTS и украинская морфология не внедрены. Нагрузочная гарантия 1000 посетителей/день не заявляется без отдельного теста.
- SQLite предполагает один экземпляр приложения с постоянным диском. Для нескольких экземпляров понадобится PostgreSQL и перенос доступа к данным. Это не переключение одной переменной.
- Drizzle ORM и Zod устанавливаются из npm (версии закреплены в package.json и package-lock.json). Папка vendor больше не нужна. Переработка восстановленного кода в TypeScript остаётся отдельной задачей.

Архитектура и следующие шаги: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
История восстановления исходного архива: [docs/RECOVERY.md](docs/RECOVERY.md). Сведения о проверках в ней относятся к версии 0.2.

## Результат проверки этой версии

Production-сборка, 3 теста Node.js и 43 HTTP-проверки прошли. HTTP-сценарий включает модерацию перед публикацией, защиту чужих вакансий/откликов, повторный отклик, компанию, блокировку, закрытую вакансию и sitemap. Внешний вид главной страницы проверен в браузере. Полный браузерный сценарий не подтверждён: в облачном предпросмотре интерактивные элементы не отработали; поэтому успешный браузерный E2E-тест не заявляется. На локальной production-сборке HTTP-проверки прошли.

## Локализация

Тексты находятся в `locales/uk.json`. Использование токенов и добавление языков: [docs/I18N.md](docs/I18N.md).

### Registration and Google OAuth

`/register` supports email/password registration and a candidate/employer role
selector. Candidate navigation opens `/register?accountType=candidate`;
`/register?accountType=employer` preselects the employer role. The choice remains
editable and is applied to both registration methods. Existing Google accounts
keep their original role when signing in again.

For Google, create an OAuth client of type **Web application** in Google Cloud,
configure the consent screen, and set these server environment variables:

- `PRATSIA_ORIGIN`: the exact public origin, e.g. `https://pratsia.com.ua`.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: the OAuth client's credentials.
- Authorized redirect URI: `https://pratsia.com.ua/api/auth/google/callback`
  (locally: `http://localhost:3000/api/auth/google/callback`).

The Google button is disabled with an email fallback when configuration is
missing. Run `npm run db:migrate` before starting (build/start also run migrations).
The authorization-code flow uses PKCE, nonce, an expiring single-use state bound
to an HttpOnly browser cookie, and Google's ID-token signature/audience/issuer
verification. Only verified emails are accepted. Provider identity uses Google's
stable subject identifier; an existing password account is never automatically
linked just because the email matches. Google tokens are not persisted.

Successful email or Google registration creates the regular application session.
The candidate demo's resume/favorites storage remains local to the browser.
The full employer dashboard is still paused; successful registration returns to `/` for
both roles. Live Google consent/token exchange requires real credentials and
must be checked in the configured environment.
