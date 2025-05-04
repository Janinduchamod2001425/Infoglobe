# Infoglobe 🌍

###### REST Countries API

![Logo](cover/Infoglobe.png)

### 📌 Overview

World Explorer is a responsive React application that allows users to explore country information from around the world
using the REST Countries API. The app features user authentication, country search and filtering, and a favorites
system.

### ✨ Features

* **Country Browsing**: View all countries with key details
* **Advanced Search**: Filter by name, region, or language also can search by country name
* **User Authentication**: Secure signup/login with Firebase
* **Favorites System**: Save favorite countries (persists across sessions)
* **Responsive Design**: Works on all device sizes (Tailwind CSS)

### 🛠️ Tech Stack

##### Frontend & UI

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-F7DF1E?style=for-the-badge&logo=react&logoColor=black)
![Lottie-React](https://img.shields.io/badge/Lottie-00C4CC?style=for-the-badge&logo=lottiefiles&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF6B6B?style=for-the-badge&logo=toastify&logoColor=white)

##### Backend & Auth

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Firebase Firestore](https://img.shields.io/badge/Firestore-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)

##### API

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-00BFFF?style=for-the-badge)

##### Utilities

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 📚 API Reference

This project uses the REST Countries API:

- **Purpose**: Primary data source for country information
- **Endpoint**: `https://restcountries.com/v3.1`

* **GET /all** - Get all countries
* **GET /name/{name}** - Search by country name
* **GET /region/{region}** - Filter by region
* **GET /alpha/{code}** - Get country by code

### .env (Firebase configuration)

```dotenv
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```


