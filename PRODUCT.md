# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mixed local audience in the Maule region of Chile (Linares, Talca and surroundings):

- **Small and medium businesses** looking for a provider to keep their technology running and build their digital presence: IT support/maintenance, web development and landing pages, hosting administration, database work, and strategic IT consulting.
- **Individuals** needing practical help with their computers or a quick technical solution.

Their job on the site: evaluate whether SV Tech can solve their need, see proof of real work, and get in touch with a proposal or a support request.

## Product Purpose

The corporate website of SV Tech, a technology and IT-consulting company from Linares, Maule. It presents the service catalogue (Soporte Informático, Desarrollo Web, Consultoría TI, Administración Hosting, Base de Datos, Soporte Personalizado), demonstrates capability through real projects and client names, and converts visitors into leads through a validated contact form.

Success means a qualified local contact reaching out and starting a project or support engagement.

## Positioning

A personalized, full-service IT partner for SMEs. SV Tech offers support, web development, hosting administration, databases and consulting under one roof, and adapts solutions to each business's own processes rather than selling a one-size-fits-all product. Local presence in Linares and the Maule region, with human, direct attention.

## Operating Context

- Site content is entirely in Chilean Spanish.
- Contact is a single-channel funnel: a validated contact form (EmailJS + Cloudflare Turnstile anti-bot) plus direct channels — phone/WhatsApp +569 8793 3282, email contacto@svtech.cl, located in Linares, Maule.
- Attention hours: Lunes a Sábado, 09:00–14:00 and 15:00–20:00.
- Active social/community presence: X/Twitter (svtech_code), Instagram (svtech_code), a Discord community, and WhatsApp.
- The site is a single-page structure with anchored sections (Inicio, Servicios, Proyectos, Nosotros) plus dedicated service detail pages.

## Capabilities and Constraints

- Six confirmed services with dedicated detail pages (see `src/consts/services.ts`).
- Real project portfolio of five completed engagements across development and IT services (see `src/consts/projects.ts`), including a school pre-enrollment system, an early-warning system for a technical education center, a Google Sheets automation, hosting migration and IT advisory.
- Eight real customer references (see `src/consts/customers.ts`).
- Technical baseline: Astro (SSG) + TypeScript strict + TailwindCSS 4, deployed on Vercel; performance and accessibility oriented (lazy loading, semantic HTML, ARIA labels, keyboard navigation, `prefers-reduced-motion` support).
- **Deliberately undecided:** team size, founding year, company story, and certifications — not claimed anywhere in the repo; future work must not invent them.

## Brand Commitments

- Name: **SV Tech** (written "Sv Tech" in titles); domain **svtech.cl**; logo files under `src/assets` and `public/images`.
- Tagline in use: "Transformando ideas en realidades digitales".
- Positioning words in use: "a medida" (custom/tailored), soporte integral, adaptación a cada cliente.
- Company values: Compromiso, Responsabilidad, Innovación.
- Why-us benefits: Atención personalizada, Innovación y calidad, Soporte continuo.
- Copy language is Chilean Spanish.

## Evidence on Hand

- Real project data and full descriptions: `src/consts/projects.ts`.
- Real customer list with industries and locations: `src/consts/customers.ts`.
- Project and customer imagery: `public/images/projects`, `public/images/customers`.
- Service catalogue: `src/consts/services.ts`.
- Contact and schedule facts: `src/consts/contact.ts`.
- **Absent — must not be fabricated:** testimonials, video demos, metrics/benchmarks, pricing, licensing claims, or additional success stories beyond the five listed projects.

## Product Principles

1. **Personalization over productization:** solutions are adapted to each client's processes and goals.
2. **Prove it with real work:** show concrete, named projects and clients instead of generic claims.
3. **Full-service continuity:** support and care extend past delivery (soporte continuo, hosting administration).
4. **Quality and innovation as the default:** modern tech, clean architecture, accessibility and performance as a baseline.
5. **Direct, human access:** the visitor can always reach a person by phone, WhatsApp, or email, fast.
