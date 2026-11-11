This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

- `app/`: Route entry points, metadata, global styles, and assets. Pages and layouts re-export feature components; existing URLs remain defined here.
- `features/`: UI grouped by domain. Pages use descriptive PascalCase names such as `AppointmentsPage.tsx`. Supporting UI lives in each feature's `components/` folder; non-UI helpers stay beside the feature page in `utils.ts`.
- `features/shell/`: Root and overview layouts.
- `components/`: Shared `ui/`, `inputs/`, and `client/` components.
- `lib/`: Shared hooks, services, types, and utilities.
- `providers/`: Application providers.

Implement page changes in `features/` and keep `app/` entry points thin.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
