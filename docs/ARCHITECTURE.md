# Architecture Overview

This repository is a production-oriented TypeScript API template supporting both PostgreSQL (via Prisma) and MongoDB (via Mongoose). The design emphasizes strict typing, clear separation of concerns, and robust error handling.

Folders

- `src/config` — environment validation and runtime config.
- `src/db` — DB adapters: `prisma.ts` (Prisma client) and `mongo.ts` (Mongoose helper).
- `src/models` — Mongoose models (only used when `MONGO_URL` is set).
- `src/controllers` — thin HTTP layer; validates and orchestrates services.
- `src/services` — business logic and DB access; export functions for both Prisma and Mongoose usage.
- `src/routes` — Express routers.
- `src/middlewares` — Express middlewares (error handling, auth, etc.).
- `src/errors` — typed error classes (e.g., `AppError`).
- `src/types` — shared TypeScript types (e.g., `ApiResponse`).
- `src/validators` — request DTOs using `zod` for strict validation.
- `src/utils` — helpers like `logger`.

Databases

- PostgreSQL: Use Prisma schema in `prisma/schema.prisma`. Run `npx prisma migrate dev --name init` to apply migrations.
- MongoDB: Use Mongoose models in `src/models` and `src/db/mongo.ts` to connect.

Error Handling

- Use `AppError` for predictable, operational errors.
- Global `errorHandler` middleware converts errors into typed responses.

Strict Typing

- DTOs use `zod` and exported `z.infer<>` types.
- Responses use `ApiResponse<T>` for consistent shape.

Getting Started

1. Copy `.env.example` to `.env` and set DB URLs.
2. Install dependencies: `npm install`.
3. Generate Prisma client: `npx prisma generate`.
4. Run dev server: `npm run dev`.

Notes

- The example service implements both Prisma and Mongoose variants; choose one per deployment.
- Add authentication, rate-limiting, request logging, and observability as needed for production.
