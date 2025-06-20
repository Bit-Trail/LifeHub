# 🌟 LifeHub – Your All-in-One Personal Productivity Companion

Welcome to **LifeHub**, a full-stack productivity web app designed to help you organize your life with clarity, focus, and growth.  
From tracking daily **tasks**, **habits**, **journals**, and **goals**, to getting smart **AI insights** based on your data — LifeHub is your digital coach and planner, all in one place.

---

## ✨ Features

- ✅ **User Authentication** (Register / Login)
- ✅ **Task Tracker** – Organize daily to-dos by category (Work / Personal)
- ✅ **Habit Tracker** – Build consistency with recurring habit logs
- ✅ **Goal Manager** – Set goals, track status, and drag-drop between stages
- ✅ **Journal Logs** – Write and store personal reflections
- 🤖 **AI Insights** – Get smart suggestions using Groq LLM (via free API!)
- 🧠 Role-based dashboards for `User` and `Admin`
- 💅 Built with a clean, responsive UI using **Next.js + Tailwind + ShadCN**

---

## 🛠️ Tech Stack

| Frontend             | Backend              | Database      | AI Engine          |
| -------------------- | -------------------- | ------------- | ------------------ |
| Next.js (App Router) | Express + TypeScript | PostgreSQL    | Groq LLM (LLaMA 4) |
| Tailwind CSS v4      | Prisma ORM           | Prisma Schema | OpenAI-compatible  |

---

## 🚀 Getting Started

> ✨ Prerequisites:

- Node.js `v18+`
- PostgreSQL installed and running
- Git

---

### 1. 📁 Clone the Repo

```bash
git clone https://github.com/your-username/lifehub.git
cd lifehub

```

2. ⚙️ Backend Setup

cd lifehub-be
npm install

---

## Create a .env file in lifehub-be/ and add:

PORT=3030
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/lifehub"
JWT_SECRET="your_super_secret_key"
GROQ_API_KEY="gsk_your_groq_api_key"
GROQ_MODEL="meta-llama/llama-4-scout-17b-16e-instruct"

---

## Sync Prisma schema to DB:

npx prisma migrate dev --name init
npx prisma db seed # optional, if you add seed

## Start server:

npx ts-node-dev src/index.ts

---

3. 🎨 Frontend Setup:

cd ../lifehub-fe
npm install

## Create a .env.local file in lifehub-fe/:

NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3030

## Start frontend:

npm run dev

---

🧪 Test Users
You can register as:

User → to track your own tasks and habits

Admin → to manage global data (via admin dashboard)

---

🤖 AI Insights (Free & Smart)
We use Groq’s OpenAI-compatible LLaMA models which are blazing fast and free.
You get:

Automated insights from your task, habit, journal data

Smart replies to your questions

JSON-based coaching suggestions

🔐 Just generate a key from https://console.groq.com
