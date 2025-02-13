# curotec-fullstack-assessment

## Project Overview

This project is a full-stack application for managing routines and tasks. It includes features such as caching, pagination, and toasts for user feedback.

## Architectural Decisions

### Backend

- **Framework**: Express.js
- **Database**: Prisma with SQLite
- **Caching**: Cache-manager with Keyv for in-memory caching
- **Error Handling**: Custom error middleware

### Frontend

- **Framework**: React with Vite
- **State Management**: React Query
- **Styling**: TailwindCSS
- **Toasts**: Sonner for user feedback

## Usage Examples

### Creating a Routine

To create a new routine, click the "New Routine" button and fill out the form. The routine will be saved and displayed in the list.

### Adding a Task

To add a task to a routine, click the "Add Task" button within the routine card and fill out the form. The task will be saved and displayed within the routine.

## Setup and Deployment Instructions (Local)

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose

### Installing Docker and Docker Compose

#### Windows

1. **Download Docker Desktop**:

   - Go to the [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) page.
   - Download and install Docker Desktop.

2. **Install Docker Compose**:
   - Docker Compose is included with Docker Desktop, so no additional installation is required.

#### macOS

1. **Download Docker Desktop**:

   - Go to the [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) page.
   - Download and install Docker Desktop.

2. **Install Docker Compose**:
   - Docker Compose is included with Docker Desktop, so no additional installation is required.

#### Linux

1. **Install Docker**:

   - Follow the instructions for your Linux distribution on the [Docker Engine installation guide](https://docs.docker.com/engine/install/).

2. **Install Docker Compose**:
   - Follow the instructions on the [Docker Compose installation guide](https://docs.docker.com/compose/install/).

### Backend Setup

1. **Create Environment Variables**:

   - Create `.env.dev` and `.env.prod` files in the `back-end` directory.
   - Follow the format in `back-end/env.example` to set the necessary environment variables.

2. **Navigate to the `back-end` directory**:

   ```sh
   cd back-end
   ```

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Start the development server**:

   ```sh
   npm run docker:dev
   ```

5. **Start the production server**:
   ```sh
   npm run docker:prod
   ```

### Frontend Setup

1. **Navigate to the `front-end` directory**:

   ```sh
   cd front-end
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm run dev
   ```

### Scripts Explanation

- **`npm run build`**: Build the backend application.
- **`npm run start`**: Start the backend application.
- **`npm run dev`**: Start the backend application in development mode.
- **`npm run migrate`**: Run database migrations.
- **`npm run generate`**: Generate Prisma client.
- **`npm run init`**: Initialize the project.
- **`npm run docker:dev`**: Start the backend application in development mode using Docker.
- **`npm run docker:prod`**: Start the backend application in production mode using Docker.

## Areas for Improvement and Future Enhancements

- Add WebSocket for real-time data
- Add Authentication so Users can have their own routines for their accounts.
- Deploy the back-end in a serverless architecture (Azure or AWS).
- Deploy the front-end on Vercel.
- Unit Testing for API endpoints.
- Detail page of a routine, showing it with more details.
