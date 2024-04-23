### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

### Анализ работы приложения, поиск утечек памяти

### Результаты задачи:

Добавлен критический CSS для оптимизации отображения страницы на этапе загрузке стилей
[Screencast.webm](https://github.com/harlequin-plus/dreamteam_mf05/assets/71240827/ea7dd43c-849b-4581-8089-3b9edfd8b105)

Рассмотрена нагрузка приложения на CPU во время работы: 
 - нарушений не обнаружено
 - наиболее трудоёмкие операции приходятся на загрузку стилей 
 
![Screenshot from 2024-04-22 03-31-24](https://github.com/harlequin-plus/dreamteam_mf05/assets/71240827/cafa3d9c-01ad-4a72-bd56-305418b3694d)

![Screenshot from 2024-04-22 03-31-20](https://github.com/harlequin-plus/dreamteam_mf05/assets/71240827/6f69cee8-7289-4091-9e28-53b328a1829f)


 Рассмотрено потребление памяти в процессе работы приложения:
 - нарушений не обнаружено
 - наблюдается увеличение объёма потребляемой памяти по мере использования
 - постепенно наблюдается сокращение испольуемой памяти
 - подобное поведение считается ожидаемым

![Screenshot from 2024-04-22 03-45-09](https://github.com/harlequin-plus/dreamteam_mf05/assets/71240827/263890b1-a621-4de8-9e6e-eb941399e393)
наблюдается очистка памяти 
