# pde-book-example

A modern, responsive task management application built with React and TypeScript. This application demonstrates how to create a polished frontend environment with data persistence, perfect for understanding how UI components interact with a mock backend.

## Company Information
CraftAmplify LLC

## Legal Notice
© 2025-2026 CraftAmplify LLC. All rights reserved.
This application is for educational purposes only. Unauthorized copying or distribution is prohibited.

## Description

This project is designed to simulate a modern frontend development environment with a focus on user experience and data persistence. It showcases best practices for building interactive web applications with smooth animations, responsive design, and seamless backend integration using a mock API.

## Features

- **Task Management**: Add, complete, and delete tasks with intuitive interactions
- **Smart Reordering**: Completed tasks automatically move to the top of the completed section
- **Smooth Animations**: Polished transitions for task state changes and deletions
- **Touch & Mouse Support**: Swipe-to-delete on touch devices, hover-to-delete on desktop
- **Data Persistence**: All changes are saved to a mock backend using JSON Server
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, accessible interface built with Shadcn/ui components
- **TypeScript**: Full type safety for better development experience

## Tech Stack

- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - Accessible, customizable component library
- **JSON Server** - Mock REST API for data persistence
- **PostCSS** - CSS processing with Autoprefixer

## Getting Started

### Prerequisites

- **Node.js** (v24.0.0 or higher) with npm
  - Optional: use `nvm` for Node.js version management (not required)

Check your Node version:
```bash
node -v  # should be >= 24.0.0
```

### Known Good Setup

If you are following the exercises from *Product Design Engineering*, use these commands from the project root:

```bash
npm ci
npm run mock:api
npm run dev
npm test
```

The app expects the mock API and frontend development server to run at the same time. Keep `npm run mock:api` running in one terminal tab, then run `npm run dev` in another.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm ci
   ```
   
   `npm ci` is recommended because it installs **exactly** what's in `package-lock.json` for a consistent, reproducible setup (great for classrooms and CI).

   **Install output you can ignore:** `deprecated` warnings for `inflight` or `glob` from test tooling. They look alarming but are common and do not block the exercises. This repo also sets `fund=false` in `.npmrc` so `npm fund` lines stay hidden during install.

   **Install output worth acting on:** `npm audit` reporting moderate or higher vulnerabilities, or Playwright asking you to run `npx playwright install` (a fresh `npm ci` in this template should install Chromium automatically via `postinstall`).

   Use the Node version in `.nvmrc` (Node 24). Newer Node versions should work, but if setup behaves unexpectedly, compare your local version against the project requirement first.

### Running the Application

#### 1. Start the Mock Backend (JSON Server)

**In a separate terminal tab/window**, run:

```bash
# Start the mock backend server (mock API)
npm run mock:api
```

Note: This starts a local mock API backed by `db.json`. For this project, `npm run mock:api` resets `db.json` from `db-backup.json` when it starts, which keeps the app in a predictable state (and avoids confusing diffs).

Restore mock data at any time:
```bash
npm run db:reset
```
This resets `db.json` from `db-backup.json`.

Keep this terminal running. The backend needs to stay active for the frontend to work properly.

#### 2. Start the Frontend Application

**In your main terminal**, run:

```bash
npm run dev
```

#### 3. Access the Application

Open your browser and navigate to:
- **Local**: `http://localhost:5173`
- **Network**: The URL will be displayed in your terminal (usually `http://localhost:5173`)

## Usage

### Adding Tasks
- Type a task description in the input field
- Click "Add" or press Enter to create the task
- New tasks appear at the top of the active tasks list

### Completing Tasks
- Click the checkbox next to any task to mark it as complete
- Completed tasks automatically move to the top of the completed section
- Click the checkbox again to uncomplete a task (moves it back to the top of active tasks)

### Deleting Tasks
- **Touch Devices**: Swipe left on any task to reveal the delete button
- **Desktop**: Hover over a task to see the delete (X) button
- Click the delete button to remove the task with a smooth animation

### Task Organization
- Active tasks are displayed at the top
- Completed tasks are shown below active tasks
- Newly completed tasks appear at the top of the completed section
- Uncompleted tasks move to the top of the active section

## Project Structure

```
pde-book-example/
├── src/
│   ├── components/
│   │   ├── AddTaskForm.tsx      # Task input form component
│   │   └── ui/                  # Shadcn/ui components
│   ├── hooks/
│   │   └── useSwipeToDelete.ts  # Custom hook for swipe gestures
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main application component
│   ├── index.css                # Global styles and Tailwind imports
│   └── main.tsx                 # Application entry point
├── db.json                      # Mock database for JSON Server
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite build configuration
```

## Testing

This project includes both unit tests and end-to-end (E2E) tests.

### Unit Tests (Jest & React Testing Library)

Unit tests focus on testing individual components in isolation to ensure they work correctly.

**Run unit tests:**
```bash
# Run tests once
npm test

# Run tests in watch mode (reruns when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**What's tested:**
- Component rendering and behavior
- Form interactions and validation
- Input handling and state management
- User interactions (clicks, typing, form submission)

**Test files location:** `src/components/*.test.tsx`

### End-to-End Tests (Playwright)

E2E tests simulate real user interactions by testing the complete application flow in a browser environment.

The Playwright configuration uses the same local app and mock API ports as normal development. If they are already running, Playwright can reuse them. If they are not running, Playwright can start them for you. The E2E command resets `db.json` before and after the test run so test-created tasks do not stick around.

**Run E2E tests (recommended headless):**
```bash
npm run e2e
```

Optional (headed UI):
```bash
npm run e2e:ui
```

**What's tested:**
- Adding a task and verifying the API request payload
- Basic app loading and interaction in a real browser

**Test files location:** `tests/e2e/*.spec.ts`

### Test Coverage

**Current test status:**
- Unit tests are expected to pass with `npm test`.
- E2E tests are expected to pass with `npm run e2e`.

### Chapter 7 Practice Scripts

The book uses two scripts to create and reset a controlled failure:

```bash
npm run ch7:introduce-failure
npm test
npm run ch7:reset
npm test
```

After `ch7:introduce-failure`, exactly one unit test should fail. After `ch7:reset`, the tests should pass again.

## Development

The application is built with modern development practices:

- **Hot Module Replacement**: Changes reflect immediately in the browser
- **TypeScript**: Full type checking for better code quality
- **ESLint**: Code linting for consistent style
- **PostCSS**: Advanced CSS processing with Autoprefixer
- **Comprehensive Testing**: Unit tests (Jest) and E2E tests (Playwright)

## Maintainer Notes

This repository is designed to stay stable for readers. When updating dependencies or tooling, use `npm ci`, `npm test`, and `npm run e2e` to confirm the baseline still works. If the book screenshots depend on the updated behavior, regenerate the exercise screenshots from the book repository after the repo update.

`package.json` includes temporary `overrides` for patched transitive dependencies (`js-yaml`, `@babel/core`, and `esbuild`) that Jest, ESLint, and Vite may not have picked up yet. With the overrides in place, `npm audit` will stay clean, so they can hide whether upstream has fixed the issue. During periodic maintenance, temporarily remove the `overrides` block, run `npm install`, and check `npm audit`. If the audit is clean without them, delete the overrides and reinstall. If warnings return, restore the overrides.

## Contributing

This application is designed for learning and demonstration purposes. Feel free to experiment with the code and explore different features and implementations. 



