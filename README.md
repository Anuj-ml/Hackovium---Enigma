# HealthCare Dashboard

A comprehensive healthcare and telemedicine platform delivering patient-centric care management, doctor discovery, real-time consultation, and integrated health tracking. Built with React, TypeScript, Vite, Tailwind CSS, and modern UI components, the platform enables seamless patient navigation, appointment management, secure messaging, and holistic medical insights.

**Live Demo:** [https://jx3at7nx7l27o.kimi.show/](https://jx3at7nx7l27o.kimi.show/)

## Key Features

- **Patient Dashboard** – Real-time health metrics, quick action shortcuts, and comprehensive health overview
- **Doctor Discovery** – Advanced search and filtering by specialty, ratings, availability, and location
- **Secure Doctor Chat** – End-to-end encrypted messaging with prescription management and voice consultation integration
- **Health Calendar** – Appointment scheduling, medication reminders, lab event tracking, and health events management
- **Medical Dashboard** – Interactive 3D body visualization, real-time vital sign monitoring, and medical record access
- **Notifications System** – Real-time alerts with read-state management and priority-based delivery
- **Emergency Response** – One-tap emergency contact and urgent care coordination
- **User Profile & Settings** – Comprehensive profile management, health records, and preferences
- **Video Consultation** – Integrated video calling with HD quality and screen sharing
- **Lab Results Management** – Secure test result viewing and historical health data tracking
- **Responsive Design** – Optimized for desktop, tablet, and mobile devices with adaptive UI

## Technology Stack

- **Frontend Framework** – React 19 with concurrent features
- **Language** – TypeScript for type safety and developer experience
- **Build Tool** – Vite for fast development and optimized production builds
- **Routing** – React Router v6 with hash-based routing for seamless navigation
- **Styling** – Tailwind CSS with responsive utilities and dark mode support
- **UI Components** – Radix UI primitives with custom styling and accessibility
- **3D Graphics** – Three.js with React integration (`@react-three/fiber`, `@react-three/drei`)
- **Animations** – GSAP for smooth transitions and interactive elements
- **Icons** – Lucide React for consistent iconography
- **Code Quality** – ESLint for linting and code standards enforcement

## Application Architecture

```text
src/
  components/        Reusable UI components and shared layout
  context/           Global application state and data management
  hooks/             Custom React hooks
  lib/               Utility functions and helpers
  pages/             Route-based page components
public/
  avatars/           User and doctor profile images
  videos/            Video assets for consultations and media
```

### Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Dashboard - Home and health overview |
| `/calendar` | Health Calendar - Appointments and reminders |
| `/find-doctor` | Doctor Directory - Search and discovery |
| `/chat` | Secure Messaging - Doctor consultations |
| `/video-call` | Video Consultations - HD video calls |
| `/medical-dashboard` | Medical Records - Vitals and health data |
| `/health-tests` | Lab Results - Test reports and history |
| `/notifications` | Alerts - System notifications and updates |
| `/emergency` | Emergency Response - Critical care access |
| `/profile` | User Profile - Account and preferences |

The application uses hash-based routing (`#/route`), enabling seamless deployment to static hosting without server-side configuration.

## Feature Overview

### Dashboard
- Real-time health metrics and status indicators
- Quick action shortcuts for common tasks
- Animated charts displaying health trends
- Personalized wellness recommendations
- Integration with connected health devices

### Doctor Discovery
- Advanced search with filters by specialty, ratings, and availability
- Doctor profiles with credentials, experience, and patient reviews
- Location-based filtering and distance calculations
- Real-time availability slots and booking integration
- Facility and hospital partnerships display

### Secure Messaging
- End-to-end encrypted doctor-patient conversations
- Rich text formatting and attachment support
- Prescription generation and management
- Voice consultation integration
- Message history and archival

### Health Calendar
- Appointment scheduling and reminders
- Medication and treatment tracking
- Lab test scheduling and results tracking
- Health event categorization and filtering
- Calendar synchronization with external services

### Medical Dashboard
- Interactive 3D body visualization with health indicators
- Real-time vital sign monitoring (heart rate, blood pressure, etc.)
- Medical records and document access
- Historical health data analysis
- Integrated messaging with healthcare providers
- Lab results and diagnostic reports

### Notifications System
- Real-time push notifications for appointments and alerts
- Priority-based notification delivery
- Read/unread state management
- Notification preferences and customization
- Global unread badge for quick access

### Video Consultations
- HD video quality with adaptive bitrate
- Screen sharing capabilities
- Call recording with patient consent
- Session notes and follow-up generation
- Calendar integration for scheduled calls

### Emergency Response
- One-tap emergency contact activation
- Location sharing with emergency services
- Medical history quick access for responders
- Emergency contact list management
- Incident documentation and follow-up

## Getting Started

### System Requirements

- Node.js 20 or newer
- npm 10 or newer
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Run code quality checks:**
   ```bash
   npm run lint
   ```

## Build and Deployment

### Development
```bash
npm run dev
```
Starts Vite's development server with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle with TypeScript type checking.

### Preview Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

### Code Quality
```bash
npm run lint
```
Runs ESLint to enforce code standards and catch potential issues.

## Available NPM Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint linting checks |

## Asset Management

### Required Static Assets

The following assets must be present in the `public/` directory:

**Doctor Profiles:**
- `public/avatars/dr-alex.jpg`
- `public/avatars/dr-benjamin.jpg`
- `public/avatars/dr-jhony.jpg`
- `public/avatars/dr-segnil.jpg`
- `public/avatars/dr-sofia.jpg`
- `public/avatars/dr-wesley.jpg`

**User Assets:**
- `public/avatars/user-avatar.jpg`
- `public/videos/dr-video.mp4`

If updating assets, maintain the existing filenames or update the corresponding references in the source code.

## Configuration

- **Styling** – Configured in `tailwind.config.js` with custom theme extensions
- **Global Styles** – `src/index.css` for application-wide CSS
- **App Styles** – `src/App.css` for component-specific styling
- **Layout** – `src/components/Layout.tsx` and `src/components/Sidebar.tsx` for shell components
- **State Management** – `src/context/AppContext.tsx` for global application state

## Development Workflow

- Uses TypeScript for type safety across the entire codebase
- Components are organized by function and reusability
- UI primitives are centralized in `src/components/ui/`
- Route-based code splitting for optimal performance
- ESLint enforces consistent code standards
- Hot module replacement for fast development iteration

## Deployment

The application is deployed on a modern edge platform supporting:
- Static asset serving with caching
- Automatic HTTPS and security headers
- Global CDN for optimized content delivery
- Git-based continuous deployment
- Environment-based configuration

**Live deployment:** [https://jx3at7nx7l27o.kimi.show/](https://jx3at7nx7l27o.kimi.show/)

## Troubleshooting

### Application fails to load
- Verify all dependencies are installed: `npm install`
- Check browser console for errors: `F12` to open developer tools
- Ensure required assets are present in `public/` directory
- Clear browser cache (`Ctrl+Shift+Delete` on Windows/Linux or `Cmd+Shift+Delete` on Mac)

### Routes not loading correctly
- The application uses hash-based routing (`#/`), which requires no server configuration
- If routes fail, verify `src/main.tsx` has `HashRouter` configured
- Check that all route components are properly imported

### Build process fails
- Run `npm run lint` to identify code quality issues
- Review TypeScript errors in terminal output
- Ensure Node.js version is 20 or newer: `node --version`
- Try clearing `node_modules` and reinstalling: `rm -rf node_modules && npm install`

### Video or avatar assets not loading
- Verify asset filenames match exactly (case-sensitive on Unix-like systems)
- Confirm assets exist in `public/avatars/` and `public/videos/`
- Check browser network tab to see failed requests
- Ensure file paths in code reference correct locations

### Performance issues on slower connections
- Build uses automatic code splitting for route-based performance
- Enable browser caching headers for static assets
- Consider using `npm run preview` to test production build locally

## Support and Contribution

For bug reports, feature requests, or contributions:
- Review existing issues before creating new ones
- Provide detailed reproduction steps for bugs
- Follow the existing code style and patterns
- Run tests and linting before submitting changes

## License

This project is proprietary. All rights reserved. Unauthorized copying, modification, or distribution is prohibited.
