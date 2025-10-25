# 🎯 SkillSwap – A Local Skill Exchange Platform

## 📘 Project Overview
**SkillSwap** is an interactive platform that allows users to **offer, learn, and exchange skills** within their local area. Whether it’s **guitar lessons, language exchange, coding help, or yoga training**, users can explore skill listings, connect with local providers, and book learning sessions easily.

---

## 🌐 Live Demo
🔗 **Live Site:** [https://your-netlify-link.netlify.app](https://your-netlify-link.netlify.app)

---

## 🚀 Key Features

### 🧭 General
- Fully **responsive** (mobile, tablet, desktop)
- **Single Page Application (SPA)** – no reload errors
- Clean and **modern UI** with minimalist design
- Smooth animations using **AOS** and **Swiper.js**

### 🔐 Authentication
- Firebase Authentication (Email/Password + Google Login)
- Password validation:
  - Minimum 6 characters  
  - At least one uppercase & one lowercase letter
- Functional **Forgot Password** and **Update Profile**
- Password visibility toggle (eye icon)
- Secure environment variables via `.env` file

### 💡 Skill Listings
- Dynamic skill cards from local **JSON data**
- “View Details” page for each skill (Protected route)
- “Book Session” form with success toast
- Shows image, rating, price, and available slots

### 👤 My Profile Page
- Displays user **name**, **email**, and **photo**
- Functional **Update Profile** button
- **Logout** and **Google sign-in** supported

### 🏆 Extra Sections
- “Top Rated Providers” section
- “How It Works” section
- Additional section: “Why Choose SkillSwap?”

---

## 🧰 Technologies Used

| Category | Tools |
|-----------|--------|
| **Frontend** | React (Vite) |
| **Styling** | Tailwind CSS, DaisyUI |
| **Routing** | React Router DOM |
| **Animations** | AOS, Swiper.js |
| **Notifications** | React Hot Toast |
| **Authentication** | Firebase |
| **Deployment** | Netlify |

---

## ⚙️ Environment Variables
Create a `.env` file in the root folder and add:

```bash
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messagingSenderId
VITE_appId=your_appId
