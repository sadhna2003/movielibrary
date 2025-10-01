# 🎬 Movie Library

A full-stack Movie Library application built with **Next.js (frontend)**, **Express.js (backend)**, **MongoDB (database)**, and **Docker**. Users can browse movies, view actor profiles, add reviews, and admins can manage movies and actors.

---

## 🛠 Features

- User registration and login (JWT-based authentication)  
- CRUD operations for movies and actors (admin only)  
- Add and view reviews for movies  
- Search movies by title, genre, or actor  
- Pagination and sorting for movie lists  
- Admin panel for managing movies and actors  
- Dockerized setup for frontend, backend, and database  

---

## 📦 Requirements

- **Docker** (Docker Desktop recommended)  
- **Docker Compose**  
- Node.js (for local development without Docker)  
- MongoDB (if running locally, optional if using Docker)  

---

## ⚡ Project Code Locations

- **Backend (Express + MongoDB):** `api/`  
- **Frontend (Next.js):** `frontend/`  

---

## ⚡ Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/movie-library.git
cd movie-library
```
### 2. Configure environment variables

- **Backend (api/.env)**

```bash
MONGO_URI=mongodb://mongo:27017/movielib
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

- **Frontend (api/.env)**

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3.Run Locally

- Backend

```bash
cd api
npm install
npm run dev
```

- Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Express.js, Node.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Docker:** Docker + Docker Compose  
- **Optional GUI:** mongo-express
