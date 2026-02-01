# lil group — Next.js (TypeScript) + Tailwind

Quick scaffold for an educational institution site with a vibrant "liquid glass" aesthetic and a focus on books, brain science, and learning resources.

Features:
- Home, About, Academics, Admissions, Events, Contact, Resources, Gallery pages
- Admin panel (password protected) to upload images to the Gallery and edit page content
- Images saved to `public/uploads` and metadata in `data/uploads.json`


Setup:
1. npm install
2. Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET`
3. npm run dev

Admin:
- Visit `/admin` to login and upload (uses a JWT cookie; make sure to set `ADMIN_JWT_SECRET`).

Note: This scaffold uses placeholder images (picsum) initially. Replace them with real images later.
