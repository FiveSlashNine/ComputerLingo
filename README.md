# 🖥️ Computerlingo

Computerlingo is an interactive learning platform designed to help users master foundational Computer Science concepts. Whether you're a student, developer, or tech enthusiast, Computerlingo offers an engaging and structured way to test and strengthen your CS knowledge.

## 🛠️ Build & Run Instructions

To run Computerlingo locally using Docker:

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/) installed (if not included with Docker)

### Run the App

```bash
docker compose up --build
```

This command will:

- Build the frontend and backend services (powered by Next.js)
- Set up the PostgreSQL database
- Launch the entire application in containers

Once the process is complete, the app will typically be available at:
http://localhost:3000

## 🚀 Features

### 📚 Categories

Learn and practice across essential Computer Science topics:

- Data Structures
- Algorithms
- Object-Oriented Programming (OOP)
- Big O Notation
- Recursion
- SQL

### 🧠 Progressive Learning

Each category is organized into multiple levels that progressively build your understanding.

### 🧩 Interactive Question Types

We support a variety of question formats to keep learning dynamic:

- ✅ True or False
- 🔢 Multiple Choice
- ✍️ Fill in the Blanks
- 🔀 Reordering (e.g., steps, code segments)

## 🎯 Goals

Computerlingo aims to:

- Reinforce key Computer Science principles through repetition and variation.
- Encourage active learning through immediate feedback.
- Make learning CS accessible, gamified, and fun!

## 🏗️ How It Works

1. Choose a Category: Select from topics like Data Structures or SQL.
2. Pick a Level: Start at level 1 and work your way up.
3. Answer Questions: Tackle different types of questions tailored to the topic.
4. Track Progress: Get feedback and track your improvement as you go.

## 🏗️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) – React-based framework for server-side rendering and static site generation
- [React](https://reactjs.org/) – JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development

### Backend

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) – Built-in backend capabilities using serverless functions

### Database

- [PostgreSQL](https://www.postgresql.org/) – Powerful, open source object-relational database system

## 📈 Future Plans

- Add user accounts and progress tracking
- Unlock achievements and badges
- Add a leaderboard for friendly competition
- Expand with new categories and advanced topics

## 📬 Contributing

Want to help make Computerlingo better? Feel free to submit issues or pull requests. We welcome contributions!
