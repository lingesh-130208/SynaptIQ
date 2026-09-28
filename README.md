# SynaptIQ — Complete Full-Stack Club Platform

This archive upgrades the original visual starter into a production-oriented full-stack application.

## Included
- Next.js + TypeScript + Tailwind
- PostgreSQL + Prisma ORM 7
- Auth.js Google OAuth + email/password credentials
- Role-aware protected routes
- Membership application API
- Events and member registration
- Skill-based authenticated member search
- Team creation and invitations
- Project data model
- Certificate issuance and public verification API
- Announcements, achievements, gallery, ELIXA, notifications and audit-log data models
- Member dashboard and admin dashboard foundation

## Important
The application is code-complete for the backend architecture, but production services still require your own credentials:
- PostgreSQL DATABASE_URL
- AUTH_SECRET
- Google OAuth client ID/secret
- Email provider key if email is enabled
- Storage provider credentials if image/file uploads are enabled

No secrets are embedded in the project.

## Run tomorrow

1. Install Node.js 20.19+.
2. Copy `.env.example` to `.env`.
3. Add PostgreSQL credentials.
4. Add Google OAuth credentials.
5. Run:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000

Seed accounts:
- admin@synaptiq.club / ChangeMe123!
- member@synaptiq.club / ChangeMe123!

Change these before any public deployment.

## Production

Configure environment variables on the hosting platform, then:

```bash
npm run db:deploy
npm run build
npm start
```

The database should be PostgreSQL. Do not commit `.env`.

## Google callback

Local:
`http://localhost:3000/api/auth/callback/google`

Production:
`https://YOUR-DOMAIN/api/auth/callback/google`

## Remaining service integrations

The schema already contains email logs and file URLs, but actual email/file delivery should be connected to a provider using environment variables. This avoids pretending a production provider exists when no account/credentials have been supplied.
