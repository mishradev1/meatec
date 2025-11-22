# Task Manager Application

A modern, sleek task management application built with React, TypeScript, and Tailwind CSS.
This project simulates a real-world application with authentication and CRUD operations using Mock Service Worker (MSW).

## Features

-   **Authentication**: Mocked login flow with JWT simulation.
-   **Task Management**: Create, Read, Update, and Delete tasks.
-   **Modern UI**: Minimalistic white and green theme using Ant Design.
-   **UX**: Enhanced user experience with native Ant Design components and feedback.
-   **Animations**: Smooth transitions using Framer Motion.
-   **State Management**: Powered by Zustand with persistence.
-   **Form Handling**: Ant Design Form (built-in validation).

## Tech Stack

-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **UI Library**: Ant Design
-   **Styling**: Tailwind CSS v4 (utilities)
-   **State**: Zustand
-   **Mocking**: MSW (Mock Service Worker)
-   **Icons**: Ant Design Icons
-   **Animations**: Framer Motion

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

**Note**: MSW is initialized in the browser. You should see `[MSW] Mocking enabled.` in the console.

### Mock Credentials

To log in, use the following credentials:

-   **Username**: `test`
-   **Password**: `test1234`

## Project Structure

-   `src/components`: Reusable UI components (Button, Input, Modal, etc.)
-   `src/pages`: Application pages (Login, Dashboard)
-   `src/store`: Zustand stores for Auth and Task state
-   `src/mocks`: MSW handlers and setup
-   `src/types`: TypeScript interfaces
-   `src/utils`: Helper functions

## How Mocking Works

This project uses **Mock Service Worker (MSW)** to intercept network requests at the browser level.
Instead of hitting a real backend, requests to `/api/*` are captured by the Service Worker, which returns simulated responses defined in `src/mocks/handlers.ts`.
This allows for a realistic development experience without needing a running backend server.
