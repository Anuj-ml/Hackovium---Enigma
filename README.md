# HealthCare Dashboard Mockup

A polished healthcare and telemedicine dashboard built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui-style components. The app is a front-end mockup focused on patient navigation, doctor discovery, appointment management, chat, calendar-based health tracking, notifications, and a medical overview experience.

The project uses local mock data and static assets, so it runs entirely in the browser without a backend.

## Highlights

- Patient dashboard with health stats and quick actions
- Doctor discovery page with search, tabs, and service shortcuts
- Doctor chat experience with text and voice-style messages
- Health calendar for reminders, appointments, and lab events
- Medical dashboard with 3D-style body visualization and vitals cards
- Notifications center with unread counts and read-state management
- Emergency, profile, video call, and lab test pages
- Responsive layout with a fixed sidebar and route-based navigation

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI primitives
- GSAP for motion
- Three.js with `@react-three/fiber` and `@react-three/drei`
- Lucide icons

## Project Structure

```text
src/
  components/        Shared layout pieces and UI building blocks
  context/           Global app state and mock data
  hooks/             Reusable hooks
  lib/               Utility helpers
  pages/             Route-level screens
public/
  avatars/           Doctor and user profile images
  videos/            Sample video assets
```

### Main Routes

| Route | Screen |
| --- | --- |
| `/` | Dashboard |
| `/calendar` | Health Calendar |
| `/find-doctor` | Find Doctor |
| `/chat` | Doctor Chat |
| `/video-call` | Video Call |
| `/medical-dashboard` | Medical Dashboard |
| `/health-tests` | Health Tests |
| `/notifications` | Notifications |
| `/emergency` | Emergency |
| `/profile` | Profile |

The app uses `HashRouter`, which makes it easy to deploy to static hosting without server-side route configuration.

## Features In More Detail

### Dashboard

- At-a-glance health widgets
- Animated charts and summary cards
- Entry point into the rest of the app

### Doctor Discovery

- Search doctors by name or specialty
- Browse doctors, facilities, and hospitals
- See ratings, availability, and contact details

### Chat

- Conversation thread per doctor
- Text message sending with simulated replies
- Voice-message style UI and prescription cards

### Health Calendar

- Week and month-style views
- Filterable event categories
- Appointment, fasting, pill, and lab reminders

### Medical Dashboard

- 3D body visualization
- Vital sign cards
- Medical tabs for overview, documents, messaging, and labs

### Notifications

- Read/unread tracking
- Global unread badge in the sidebar

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended
- npm

### Install Dependencies

```bash
npm install
```

### Start the Dev Server

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually something like `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks the project and creates a production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the codebase |

## Static Assets

The app expects the following assets to be available in `public/`:

- `public/avatars/dr-alex.jpg`
- `public/avatars/dr-benjamin.jpg`
- `public/avatars/dr-jhony.jpg`
- `public/avatars/dr-segnil.jpg`
- `public/avatars/dr-sofia.jpg`
- `public/avatars/dr-wesley.jpg`
- `public/avatars/user-avatar.jpg`
- `public/videos/dr-video.mp4`

If you replace these files, keep the same filenames unless you also update the references in the source code.

## Configuration Notes

- Tailwind is configured in `tailwind.config.js`
- Global styling lives in `src/index.css`
- App-specific styles live in `src/App.css`
- The sidebar and layout shell are defined in `src/components/Layout.tsx` and `src/components/Sidebar.tsx`
- Shared mock application state lives in `src/context/AppContext.tsx`

## Development Notes

- This is a front-end mockup, so the data is static and intentionally demo-friendly
- Chat replies, notifications, appointments, and calendar events are seeded in the app context
- Route changes are handled client-side with React Router
- The UI leans on reusable component primitives from the `src/components/ui` folder

## Troubleshooting

### Blank screen after opening the app

- Make sure dependencies are installed with `npm install`
- Check the terminal for TypeScript or runtime errors
- Confirm the required assets exist under `public/avatars` and `public/videos`

### Route does not load correctly in production

- Use the app with its built-in hash-based routing
- If you change the router setup, update your deployment configuration accordingly

### Build fails

- Run `npm run lint` to catch common issues early
- Review any TypeScript errors in the terminal output

## License

No license has been specified yet. Add one if you plan to distribute or publish the project.
