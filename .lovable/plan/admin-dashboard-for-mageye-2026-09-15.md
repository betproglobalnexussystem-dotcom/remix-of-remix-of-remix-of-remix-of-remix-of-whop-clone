# Admin Dashboard for MAGEYE

A password-protected admin area at `/admin` where you manage everything the site shows, without editing code.

## What you'll be able to do

- **Hero slides** — upload images (desktop + mobile), reorder, edit links/titles, delete.
- **Director profile** — edit Hassan Mageye's photo, name, bio, button text, and pick which films appear in the rail beside the profile (select from your film list).
- **Films** — add, edit, delete. Poster, landscape image, title, description, duration, video link, and whether it's released or upcoming.
- **Explore Premiere & Upcoming Films** — choose and order which films show in that home section.
- **Events** — upload, edit, delete, manage fully.
- **Podcast & Courses** — upload episodes/courses, edit, delete.
- **Library** — the video/audio items shown under My Library.
- **Messages** — read everything sent through the Contact form and the Partners form; mark as read, delete.
- **Subscription pricing** — change the Uganda and international prices, add or remove plans, turn payment methods on/off.
- **Pages** — edit the text of Team, Board, Mission, Nonduality (add/remove/reorder people on Team and Board).

## How it works

The site currently reads all its content from files in the code. This adds a real backend (Lovable Cloud) so content lives in a database and the admin edits it live.

- Sign in at `/auth`. Only accounts with the admin role reach `/admin`; everyone else is turned away.
- Image and poster uploads go to cloud storage; the site serves them directly.
- The public pages switch from hard-coded lists to reading the database, seeded with everything currently on the site so nothing disappears.

## Technical notes

- Enable Lovable Cloud; email/password auth plus a separate `user_roles` table with an `app_role` enum and a `has_role()` security-definer function (never roles on profiles).
- Tables: `hero_slides`, `films`, `film_sections` (home rails: explore, profile-rail, series), `director_profile` (singleton), `events`, `podcasts`, `courses`, `library_items`, `contact_messages`, `partner_messages`, `subscription_plans`, `payment_methods`, `page_content` (mission/nonduality rich text), `people` (team/board with `group` column).
- RLS: public `SELECT TO anon` on content tables; all writes and all message reads restricted to `has_role(auth.uid(),'admin')`. Contact/partner forms get an `INSERT TO anon` policy only.
- Explicit `GRANT` blocks on every new public table.
- Storage buckets: `hero` (public), `posters` (public), `media` (public).
- Migration includes literal INSERTs seeding current `src/data/catalog.ts`, `src/data/pages.ts`, and `src/data/site.ts` content.
- Reads via `createServerFn` public fetchers for SSR pages; admin mutations via `requireSupabaseAuth` server fns that re-check the admin role.
- Admin routes under `src/routes/_authenticated/admin/*` with a sidebar layout; role check in the layout redirects non-admins.
- Contact and Partners forms start inserting into the message tables instead of only showing a thank-you.

## Not included

Real payment processing — pricing is editable and displayed, but Mobile Money/PayPal/Whop still wait on your API keys.
