# 🚀 CollabCode - Real-Time Collaborative Development Platform

**CollabCode** is a high-performance, real-time collaborative code editor designed for modern developers. Built with the MERN stack and powered by WebSockets, it allows multiple developers to code together, communicate via an AI assistant, and manage projects seamlessly.

---

## ✨ Key Features

*   **👥 Real-Time Collaboration**: Live multi-user code editing powered by Socket.io.
*   **🤖 AI Coding Assistant**: Integrated Google Gemini AI to help you debug, optimize, and explain code.
*   **📂 Multi-Language Support**: Support for Python, Java, C++, and JavaScript.
*   **🔒 Secure Authentication**: Firebase-powered Email/Password and Google Social Login.
*   **📱 Responsive Dashboard**: Manage your solo and team projects through a sleek, modern UI.
*   **☁️ Cloud Integration**: Powered by MongoDB Atlas for data persistence and hosted on Render & Vercel.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Redux Toolkit** (State Management)
- **Firebase** (Authentication)
- **Socket.io Client** (Real-time updates)

### Backend
- **Node.js & Express**
- **MongoDB Atlas** (Database)
- **Socket.io** (WebSockets)
- **Google Gemini AI** (AI Assistant)
- **LangChain** (AI Orchestration)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Firebase project
- Google AI (Gemini) API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harsh-kr9/CollabCode.git
   cd CollabCode
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in `/Backend`:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_url
   GOOGLE_API_KEY=your_gemini_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in `/Frontend`:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Run the Application**
   - Start Backend: `npm start` (in /Backend)
   - Start Frontend: `npm run dev` (in /Frontend)

---

## 👨‍💻 Developed By

**Harsh Kumar**   
[LinkedIn](https://www.linkedin.com/in/harsh-kumar-b41b44265/)

---
