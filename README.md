# BudgetCar

A modern marketplace for buying and selling certified pre-owned vehicles. BudgetCar delivers a fast, secure, and responsive experience for customers while providing administrators with a powerful inventory management system.

Designed with a focus on performance, usability, and scalability, the platform enables real-time vehicle management, dynamic search, advanced filtering, and seamless image handling.

---

## Features

### Customer Experience

* Browse certified used vehicles
* Detailed vehicle information pages
* Advanced search and filtering
* Discounted deals section
* Responsive design across desktop, tablet, and mobile
* Vehicle image gallery
* WhatsApp inquiry integration
* Share vehicle listings
* Real-time inventory updates

### Admin Portal

* Secure administrator authentication
* Dashboard for inventory management
* Add and manage vehicle listings
* Upload cover and gallery images
* Manage discounted vehicles
* Real-time updates through Firestore
* Cloud-based media management

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* React Icons

### Backend & Cloud Services

* Firebase Authentication
* Cloud Firestore
* Cloudinary

### Deployment

* Vercel

---

## Architecture

```text
React Frontend
        │
        ▼
Firebase Authentication
        │
        ▼
Cloud Firestore
        │
        ├──────────────► Vehicle Data
        │
        ▼
Cloudinary
        │
        ▼
Vehicle Images
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Softtrades/budgetcar-frontend.git
```

### Navigate to the project

```bash
cd budgetcar-frontend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

### Start the development server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```


---

## Security

* Firebase Authentication for administrator access
* Firestore Security Rules for database protection
* Cloudinary-hosted media assets
* Environment variables managed through Vite 


