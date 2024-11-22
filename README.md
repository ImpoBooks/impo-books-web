## Structure of the Project

```plaintext
.
├── public
│   ├── images // for bitmap images
│   └── icons // small images as usual that's the svgs
├── src
│   ├── app
│   │   ├── // other different pages
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── api
│   │   ├── actions // for server actions
│   │   ├── user-api.ts
│   │   └── // there will be files with fetch functions
│   ├── components
│   │   ├── ui // components from schadcn and ui-kit
│   │   ├── header.tsx
│   │   └── // other components
│   ├── constants
│   │   ├── index.ts
│   │   └── // can be different files related to entities
│   ├── contexts
│   │   └── user-context.ts
│   ├── hooks
│   │   └── use-user.ts
│   ├── lib
│   │   ├── metadata ?
│   │   │   └── home-metadata.ts
│   │   ├── validations
│   │   │   └── auth.ts
│   │   ├── db.ts
│   │   ├── api.ts
│   │   └── config.ts // for .env imports
│   ├── modules
│   │   ├── // for each page we create module
│   │   └── home
│   │       ├── components
│   │       │   └── home-card.tsx
│   │       ├── constants ?
│   │       ├── types ?
│   │       ├── utils ?
│   │       └── home-page.tsx
│   ├── store ?
│   │   ├── actions
│   │   └── store.tsx
│   ├── theme
│   │   ├── fonts
│   │   │   └── our-font.ts
│   │   └── global.css
│   ├── types
│   │   ├── user.ts // types related to user
│   │   └── index.ts // gloabal types
│   └── utils
│       └── user-utils.ts
└── tests
    ├── e2e
    │   └── auth-page.pw.test.ts
    ├── integration
    │   └── flows
    │       └── sign-in-flow.test.tsx
    └── unit
        ├── components
        │   └── sign-in-form.test.tsx
        └── user-utils.test.ts
```

## Our team

- **Бондаренко Олександр** - Teamlead, Back End Developer
- **Горчинський Назарій** - Back End Developer
- **Титянюк Артем** - Front End Developer
- **Рибалко Максим** - Full-stack Developer
- **Новиков Ігор** - Front End Developer, UI/UX

## Run project

1. Clone this repository:

```bash
git clone https://github.com/ImpoBooks/impo-books-web.git
```

2. Install dependencies:

```bash
npm install

```

3. Run the development server:

```bash
npm run dev
```

4. Open the project in your browser on port 3000:

http://localhost:3000

## Running Tests

### Unit and Integration tests with Jest

```bash
npm run test
```

### End-to-end tests with Playwright

```bash
npm run test:playwright
```
