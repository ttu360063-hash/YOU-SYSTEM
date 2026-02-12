# You System (SaaS)

Stack: Next.js 14 (App Router), React, TailwindCSS, Prisma + PostgreSQL, NextAuth.

## Setup rapido

1. Copie `.env.example` para `.env` e preencha as variaveis.
2. `npm install`
3. `npx prisma migrate dev`
4. `npm run dev`

## Rotas principais

- `/` landing page
- `/login` login
- `/register` registro
- `/onboarding/1` a `/onboarding/4`
- `/dashboard`
- `/assistente`

## Observacoes

- O logo final deve substituir `public/logo-ys.png`.
- A IA integrada usa apenas dados internos e nao chama modelos externos.
