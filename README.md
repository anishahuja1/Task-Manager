# Full-Stack Task Manager

A professional, modern Task Manager built with a React frontend and Node.js/Express backend. 
<img width="905" height="410" alt="image" src="https://github.com/user-attachments/assets/952947c3-d8d7-4821-b9d6-e7cdc3f7afbf" />

##  Features
- **Core CRUD**: Create, read, update (status/title), and delete tasks.
- **Filtering**: Filter tasks by All, Active, or Completed status.
- **Glassmorphism UI**: Beautiful, dark-themed responsive design.
- **Persistence**: Data is persisted in a JSON file database.
- **Animations**: Smooth transitions powered by Framer Motion.
- **Validation**: Server-side and client-side validation for task data.

##  Getting Started

### Prerequisites
- Node.js (v14+)
- npm

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```
The server will run on [http://localhost:5000](http://localhost:5000).

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 🛠️ API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update task status or title |
| DELETE | `/api/tasks/:id` | Delete a task |

## 📝 Trade-offs & Assumptions
- **Storage**: Used JSON file-based storage for simplicity as allowed by the technical assignment. In a production environment, a database like PostgreSQL or MongoDB would be preferred.
- **State Management**: Used React Hooks (`useState`, `useEffect`) for state management as the application size didn't warrant Redux or Context API.
- **Validation**: Basic string validation is performed. For complex apps, libraries like Zod or Joi would be used.
