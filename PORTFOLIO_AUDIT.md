# Portfolio source audit

Reviewed commit `899240d` on November 24, 2026, using Ponytail Audit and Code Review and Quality. The React site presents Akash’s work and accepts inquiries through Express or a Vercel function. This review assumes ordinary public portfolio traffic, including phone visitors and occasional simultaneous inquiries.

**Fix the contact form first.** A visitor can lose a message while the site tells them it was sent. The next priority is the projects section, where a short desktop viewport hides work visitors came to see.

## Must fix

1. **A rejected email looks successful.** I ran the Vercel handler with the installed Resend SDK and a mock provider that returned HTTP 422. The handler returned HTTP 200 with `data: null` and an error. Express uses the same success path. React trusts the status, clears the draft, and displays “DATA UPLOADED”. Check the SDK’s returned error, send a generic non-success status on failure, and clear the draft only after provider acceptance. Add one regression check using the same mock. [Vercel handler](api/email.js#L50) · [Express handler](server.js#L63) · [Contact form](src/components/Contact.jsx#L36)

2. **The project list clips on short desktop screens.** At 1024 × 600, Chromium rendered all five rows, but the last row ended 194 pixels below the section boundary. At this breakpoint the section has a fixed viewport height and hides overflow. Let the section grow with its contents and keep the viewport height as a minimum. Verify that the fifth project and GitHub link are fully visible at that size. [Projects layout](src/components/Projects.jsx#L166)

3. **Valid-looking submissions can lose text.** The API accepts whitespace-only names and messages because it checks them before trimming. It silently clips messages at 5,000 characters while the form permits longer drafts. Validate trimmed values and reject oversized fields with a useful error. Apply the same limits in the form so visitors can correct a draft before sending. [API validation](api/email.js#L23) · [Express validation](server.js#L36) · [Form fields](src/components/Contact.jsx#L146)

4. **A missing email credential takes the Express site offline.** Express constructs the mail client before it starts listening. The installed SDK throws immediately when the key is absent, so even static portfolio pages become unavailable. The Vercel handler also constructs the client outside its error handler. Check configuration when handling a submission, keep the rest of the site available, and return a generic service-unavailable response when email is unconfigured. [Express startup](server.js#L32) · [Vercel initialization](api/email.js#L47)

## Should fix

5. **Phones lose the section navigation.** Below the medium breakpoint, all four section links disappear while the audio button remains. A phone visitor must scroll through the pinned About panels to reach Projects or Contact. Keep compact section links visible or expose the same links through a keyboard-operable menu. [Navbar](src/components/Navbar.jsx#L72) · [About scrolling](src/components/About.jsx#L19)

6. **The visible form labels do not identify their controls.** Chromium reported a null associated control for each of the three labels. Clicking a label cannot focus its field, and assistive technology cannot use the visible text as its label. Give each field an ID and its label a matching `htmlFor`. Announce submission errors and confirmation through a status region. [Contact form](src/components/Contact.jsx#L146)

7. **Reduced-motion support stops partway through the page.** The loader honors the preference, but the hero still autoplays, About still pins and snaps horizontally, and smooth scrolling still starts. On the error page the decorative digits update every 110 milliseconds even in reduced-motion mode. Provide a static hero, stack all About panels in reading order, use native scrolling, and skip the decorative timer when the preference is set. [Loader](src/components/Loader.jsx#L15) · [Hero](src/components/Hero.jsx#L78) · [About](src/components/About.jsx#L19) · [App](src/App.jsx#L49) · [Error page](src/components/NotFound.jsx#L130)

8. **Two footer links have no destination.** “Privacy Policy” and “Terms of Use” both point to the empty fragment. Selecting either takes the visitor away from the footer without opening the promised document. Remove the links until real destinations exist. [Footer](src/components/Footer.jsx#L359)

9. **Two copies of the email handler need the same fixes.** Both implement validation, escaping, email composition, and provider response handling. Both routes serve a purpose. Have Express call the same POST handler used on Vercel, or extract just the shared submission logic if the adapters need different responses. Exercise valid input, rejected input, and provider failure against that single implementation. Keep HTML escaping and the fixed recipient. [Express](server.js#L21) · [Vercel](api/email.js#L3)

10. **The public mail endpoint has no application-level submission limit.** Each accepted request consumes a provider call. Repeated submissions can use up the account’s quota and crowd genuine inquiries out of the inbox. Check the deployed host’s existing limits and apply a limit to this route there if needed. An in-memory counter would reset across Vercel instances. [Vercel endpoint](api/email.js#L19) · [Express endpoint](server.js#L35)

11. **Two active components import an undeclared package.** The build passes because the installed ESLint React plugin brings in `prop-types`. A lint-tool change or a stricter package layout can break the application build. Declare the package directly if retaining these runtime checks. [AnimatedTitle](src/components/AnimatedTitle.jsx#L1) · [Skills](src/components/Skills.jsx#L4) · [Manifest](package.json)

12. **The hero entrance runs behind the loader.** App signals readiness through `isReady`, but Hero accepts no props and starts its entrance on mount. On a slow load, the title can finish animating under the overlay. Use the readiness signal to start the entrance on reveal. Keep scroll-trigger setup independent so it only runs once. [App](src/App.jsx#L82) · [Hero](src/components/Hero.jsx#L8)

## Cleanup with a measurable payoff

13. **Five unused components add 2,616 lines to the source tree.** The four alternate heroes and the Bento features section have no caller in the active import graph. ESLint already skips them, but Tailwind still scans their classes. If these experiments are retired, remove the directory and its lint exception in one commit. If they are design references worth keeping, move them outside Tailwind’s source glob. This reduces maintenance and CSS scanning. Their JavaScript is already excluded from the active bundle. [Archived components](src/components/archive/) · [App imports](src/App.jsx#L8) · [Tailwind inputs](tailwind.config.js#L3)

14. **Eighteen unused media files add 3,850,118 bytes to each production build.** Vite copies everything under public. A filename scan of the active components, styles and HTML found no references to these files. Move them out of public after checking whether anyone relies on their direct URLs. The savings apply to the deployment artifact. Visitors only download files their browser requests. [Public assets](public/)

    - Video — `hero-1.mp4`, used by archived hero experiments.
    - WebP — `about`, `gallery-1`, `gallery-2`, `gallery-4`, `gallery-5`, `lofoten`, `new-york`, `san-francisco`, `italy`.
    - Other images — `grid.svg`, `mist.jpg`, `coast.jpg`, `disc.gif`, `bounce.gif`, `render.gif`, `hawk.png`, `moon.png`.

15. **Mobile project previews request full-size screenshots eagerly.** Each row mounts an image even when desktop CSS hides that preview. TechMock alone is 1,178,333 bytes. Add native lazy loading to the below-the-fold row images and size the largest screenshots for their rendered dimensions. Keep the desktop hover preview responsive. [Project previews](src/components/Projects.jsx#L252)

16. **One conditional class accounts for the only use of clsx.** The audio indicator toggles a single class. Use a conditional class string and remove the direct dependency on the next cleanup pass. [Navbar](src/components/Navbar.jsx#L99) · [Manifest](package.json#L15)

17. **The README gives template instructions instead of the portfolio’s startup requirements.** A fresh checkout gives no guidance about the Vite API proxy, the Express process, the email key, or building before serving production assets. Replace the template with the actual commands and environment variable names. A contributor should be able to run both the page and the contact flow from that document. [README](README.md) · [Vite proxy](vite.config.js#L7) · [Scripts](package.json#L6)

## Verification and scope

- Reviewed the live React import graph, styles, both API entry points, HTML, build and deployment configuration, package declarations and installed dependency resolution. Inventoried the five archived components and both asset directories. The separate `archive/unused_images` directory is outside public and does not ship in the Vite build.
- Production build passed with 83 modules, 111.89 kB gzipped JavaScript and 8.28 kB gzipped CSS. Lint passed under the repository’s configured exclusions. All literal local media and font paths found in active source resolved to files.
- Ran the provider rejection mock without sending mail. Ran a headless Chromium check of the built homepage at 1024 × 600 with reduced motion and external Google Fonts disabled. The project clipping measurement applies to that setup.
- No tracked automated test suite or test script was found. Live delivery, production hosting limits, third-party destinations, physical devices, advisory status of dependencies, and the behavior of archived prototypes remain unverified.

**Verdict.** Fix false submission success and project clipping first. The largest cleanup available is 2,616 archived source lines and 3.85 MB of deployment media. One direct dependency can also be dropped.
