# 📦 Inventory Management App

This is a full-featured inventory management system developed as a test assignment for **Dzencode**. The project combines a modern technology stack to create a fast web application with real-time data updates.

---

## 🌐 Live Demo

The application is deployed and available at the following link:

🔗 **[https://dzencode-inventory-app.onrender.com/en](https://dzencode-inventory-app.onrender.com/en)**

A short video review is available for viewing at the link:

🔗 **[https://drive.google.com/file/d/198pA6Qi9ApELUxuuBbnFi097Bm-6I6BX/view?usp=sharing](https://drive.google.com/file/d/198pA6Qi9ApELUxuuBbnFi097Bm-6I6BX/view?usp=sharing)**

### ⚠️ Note for Reviewers:

- **Cold Start**: Since I am using the `Render` free tier, the server "goes to sleep" after a period of inactivity. The initial load may take **30-50 seconds**.
- **Persistence (SQLite)**: The cloud hosting uses an ephemeral file system. Any changes to the database (e.g., deleting products) will be reset to the initial state (`Seed data`) after the server automatically restarts. For stable database persistence, it is recommended to run the project via `Docker` locally.

---

## 🚀 Technology Stack

The application is built using professional development tools:

- **Frontend**: `Next.js 16 (App Router)` — a modern React framework.
- **Styling**: `Bootstrap 5` + `React-Bootstrap` — for a reliable and responsive interface.
- **CSS Preprocessor**: `SASS` — for professional style management.
- **Backend**: `Socket.io` — for WebSockets implementation (real-time dashboard updates).
- **Database**: `Prisma ORM` + `SQLite` — for reliable data management.
- **State Management**: `Redux Toolkit` — centralized state management.
- **Animations**: `Framer Motion` — for smooth transitions and animations.
- **Containerization**: `Docker` — for rapid deployment in an isolated environment.

---

## ✨ Features and Functionality

### 📊 Real-time Dashboard

- Instant tracking of active sessions via WebSockets.
- Real-time display of the total number of products in the system.

### 🛠 Product Management

- Viewing and deleting items.

### 🌍 Localization (i18n)

- Support for Ukrainian and English languages using `next-intl`.

### 📈 Analytics

- Data visualization of inventory using the `recharts` library.

---

## 🛠 Available Scripts

The following commands are configured for convenient development and deployment:

### 💻 Development and Build

- `npm run dev` — starts the development server with `nodemon` and `ts-node`.
- `npm run build` — builds the frontend part (Next.js).
- `npm run build:server` — compiles server-side TypeScript code into the `dist` folder.
- `npm run setup` — full setup cycle: installs dependencies and configures the database.

### 📂 Database Management (Prisma)

- `npm run db:setup` — synchronizes the Prisma schema with SQLite and runs the seed.
- `npm run prisma:seed` — populates the database with test data.
- `npm run postinstall` — automatic Prisma Client generation.

### 🚀 Production and Docker

- `npm run start` — runs the server in production mode directly from TypeScript files (via ts-node).
- `npm run start:prod` — runs the built project from the `dist` folder.
- `npm run start:docker` — universal command for Docker: DB + build + launch.

### 🧪 Code Quality and Testing

- `npm run lint` — checks the code using ESLint.
- `npm run test` — runs unit tests (Jest + React Testing Library).

---

## 📦 How to Run the Application

### Option 1: Via Docker (Recommended)

1.  **Build the image**:
    ```bash
    docker build -t inventory-app .
    ```
2.  **Run the container**:
    ```bash
    docker run -p 3000:3000 inventory-app
    ```
3.  **Open**: [http://localhost:3000](http://localhost:3000)

### Option 2: Local Launch

1.  **Preparation**:
    ```bash
    npm run setup
    ```
2.  **Launch**:
    ```bash
    npm run dev
    ```

---

## 📝 Notes

- **Active Sessions**: The counter displays the number of active WebSocket connections (each open tab counts as a separate session).
- **Database**: Uses an SQLite file (`dev.db`), allowing you to test the project without deploying an external SQL server.
- **Database Schema**: The schema file for MySQL Workbench is located at: `/docs/Model of database for test task.mwb`

---

**Developed by:** [Vitalii Skyrtach]  
**Contacts:** [vitalijskirtac@gmail.com / @vitalii_skyrtach / https://www.linkedin.com/in/vitalii-skyrtach/]