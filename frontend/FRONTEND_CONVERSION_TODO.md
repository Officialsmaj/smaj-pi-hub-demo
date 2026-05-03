# SMAJ PI HUB Frontend Conversion TODO

Goal: convert `smajpihub-convert-to-pi-net-docs` into the Vite React + TypeScript frontend, starting with homepage-first delivery.

## Phase 1: Home Page Baseline

- [x] Keep current Pi brand color palette and core layout structure in React homepage.
- [x] Port core homepage sections (`hero`, `services preview`, `highlights`, `trust`).
- [x] Replace all remaining placeholder links with real React routes.
- [ ] Add responsive QA checklist for mobile, tablet, and desktop.

## Phase 2: App Shell and Routing

- [x] Create route map from legacy HTML pages to React routes.
- [x] Add shared layout component for header/footer/nav.
- [x] Add 404 page and safe redirects for old URLs.
- [x] Ensure homepage redirects to `/home` (GitHub Pages subfolder support).
- [ ] Update Header logo to link explicitly to `/home`.

## Phase 3: Style System Migration

- [ ] Extract design tokens (colors, spacing, radius, shadows) from legacy CSS.
- [ ] Move repeated styles into reusable React-friendly CSS modules or styled components.
- [ ] Keep visual parity first, then clean up duplicated CSS.
- [x] Build a reusable section/card/button component set.

## Phase 4: Content/Page Conversion

- [x] Convert `about`, `services`, `how-it-works`, `pricing`, `faq`, and `contact`.
- [x] Convert `community`, `developers`, `partners`, and legal pages.
- [x] Convert blog listing and blog post templates into typed content models.
- [x] Convert dashboard-related static pages into authenticated React views.

## Phase 5: Behavior and JS Logic

- [x] Port shared menu and interaction logic from vanilla JS into React hooks/components.
- [x] Port page-specific scripts (`faq`, `community`, `portfolio`, etc.) with typed state.
- [x] Remove direct DOM mutation patterns and replace with React state flow.
- [x] Add event tracking hooks for key CTA clicks.

## Phase 6: Pi Demo Integration

- [x] Wire Pi auth flow and wallet-aware session state. (Header implementation complete)
- [x] Implement redirect/modal logic for `onIncompletePaymentFound` in Header.
- [x] Add visual "Active" route indicators to the Mobile Navigation drawer.
- [x] Add a User Profile dropdown menu (Logout/Profile) for authenticated users.
- [x] Add loading states for the Login/Session check transition.
- [ ] Connect storefront and engagement tasks to backend APIs.
- [ ] Add typed API client layer and request error handling.
- [ ] Add loading/empty/error states across all data views.

## Phase 7: Quality and Release

- [ ] Add unit tests for core components and route guards.
- [ ] Add integration tests for critical user flows.
- [ ] Run Lighthouse and performance pass on homepage + top routes.
- [ ] Prepare release checklist and deployment notes for Pi Demo frontend.

## Responsive Breakpoint Completion

Build Status: ✅ Successful (verified with `yarn build`)

Responsive Breakpoints:

| Breakpoint | Viewport Width | Hamburger | Drawer Width |
| --- | --- | --- | --- |
| Mobile | `< 768px` | ✅ Visible | `280px` |
| Tablet | `768px-1023px` | ✅ Visible | `320px` |
| Desktop | `≥ 1024px` | ❌ Hidden | N/A |

Key Features Implemented:

1. Viewport Detection (`Header.tsx`)
- Auto-close menu when resizing to desktop (`≥ 1024px`)
- Prevent body scroll when mobile menu is open via `document.body.style.overflow`
- Resize listener to detect viewport changes

2. Mobile Drawer Styling (`@media max-width: 767px`)
- `280px` drawer width, slides from right
- Compact navigation links with hover states
- Bottom sheet user auth section for mobile
- Hidden login text, icon-focused login affordance

3. Tablet Drawer Styling (`@media 768px-1023px`)
- `320px` drawer width (wider for tablets)
- Larger font size (`1.15rem`) and touch targets
- Enhanced padding for tablet use

4. Desktop Navigation (`@media 1024px+`)
- Full horizontal nav bar with underline hover animation
- Hamburger hidden, menu always visible

Responsive Behavior Summary:
- Mobile (`<768px`): Tap hamburger → drawer slides in from right → overlay covers content → body scroll locked
- Tablet (`768px-1023px`): Same behavior with wider drawer (`320px`) for better tablet UX
- Desktop (`≥1024px`): Horizontal nav always visible, hamburger hidden
- Resize Handling: If menu is open and viewport reaches desktop width, menu auto-closes
