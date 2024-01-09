# A minimal Next.js site with Sanity Studio

This starter is a statically generated site that uses [Next.js][nextjs] for the frontend and [Sanity][sanity-homepage] to handle its content.
It comes with a native Sanity Studio that offers features like real-time collaboration, instant side-by-side content previews, and intuitive editing.

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more.
You can use this starter to kick-start a clean slate site or learn these technologies.

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

> **Note**
>
> This starter uses the `/pages` directory for Next.js routing.
>
> The template will be migrated to the currently experimental [/app][app-dir] directory
> when Vercel announce that it is production ready.

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my app?](#how-can-i-remove-the-next-steps-block-from-my-app)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## Project Overview

| [Example Studio with preview](https://template-nextjs-clean.sanity.build/studio)                                        |
| ----------------------------------------------------------------------------------------------------------------------- |
| ![Sanity Studio](https://user-images.githubusercontent.com/44635000/197511725-b2a2e2e5-287b-41a9-84c6-ec90d37ca480.png) |

# Important files and folders

| File(s)                          | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `sanity.config.ts`               | Config file for Sanity Studio                                                         |
| `sanity.cli.ts`                  | Config file for Sanity CLI                                                            |
| `/pages/index.tsx`               | Landing page for `/`.                                                                 |
| `/pages/studio/[[...index]].tsx` | Where Sanity Studio is mounted                                                        |
| `/pages/api/draft.ts`            | Serverless route for triggering Draft mode                                            |
| `/sanity/schemas.ts`             | Where Sanity Studio gets its content types from                                       |
| `/sanity/env.ts`                 | Configuration for the Sanity project and dataset                                      |
| `/sanity/schemas.ts`             | Where Sanity Studio gets its content types from                                       |
| `/sanity/lib/client.ts`          | Sanity client configured based on `env.ts`                                            |
| `/sanity/lib/image.ts`           | Sanity image builder - unused in this template, but is needed to render Sanity images |
| `tailwind.config.js`             | Tailwind config. Only applies to files listed under `content`                         |

All pages are wrapped in `pages/_document.tsx` and `pages/_app.tsx`.

## Configuration

### Step 1. Set up the environment

Using the git clone clone the repo or template

### Step 2. Install node Modules

Once cloned, run the following command from the project's root directory:

```bash
npm install or yarn install
```

### Step 3. Set up the Sanity project

Once node modules is installed create a project on sanity manage [here](https://www.sanity.io/manage) and navigate to the project that created and find the varaibles for env from there and get the project id from there and create a `.env.local`at the root as shown below you can find the read token from the api tab in your sanity project setting

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION="2023-09-23"
SANITY_API_READ_TOKEN="your-new-token"
```

### Step 4. Next

Once the env is created run the below command it will start the sanity cms and next js and storybook server simultaneously

```bash
yarn dev or npm run dev
```

### Step 5. Next

once the server is started you need to go to the [Link](https://localhost:3000/studio) for cms and for next js frontend go to [Link](https://localhost:3000/) and for storybook [Link](https://localhost:6006)

### Step 5. Next Step

in the project directory find a file named as `sanity.config.ts` and change the name and title of the project in defineConfig function replace it with yours

### Step 6. Next Step

then move to the [Link](https://localhost:3000/studio) and go to `Site settings` > `Default meta data` there add the default site title and the name and favicon for the frontend

### Step 7. Next Step

Do the necessary tailwind configurations and the typography configuarations add colors in an object like parent and its child color and also add the spacing in rem and font sizes adn colors like below

```bash
 primary: {
        DEFAULT: '#124734',
        100: '#040E0A',
        200: '#0B2B1F',
        300: '#A0B5AE',
        400: '#D0DAD6',
      },
```

### Step 8. Next Step

Add the Home page in sanity cms to make the template functional
