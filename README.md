# Akash’s portfolio

The site uses React, Vite and GSAP. Run `npm ci` and `npm run dev` to open the portfolio locally.

For local contact-form delivery, start `npm start` in a second terminal with the existing Resend environment configured. Vite proxies `/api` to Express on port 3000. Express reads `RESEND_API_KEY` and the optional `CONTACT_RECIPIENT_EMAIL`.

Run `npm run lint` and `npm run build` to check the site. After a build, `npm start` serves the production site and API together. Vercel uses the handler in `api/email.js`.
