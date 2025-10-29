# 🎨 BookIt: Experiences & Slots Frontend

This is the **frontend application** for the **BookIt: Experiences & Slots** project, allowing users to browse and book travel experiences seamlessly.

---

## 🚀 Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**

---

## ✨ Features

- Browse available experiences
- View detailed experience information
- Select dates and time slots
- Book experiences with personal details
- Apply promo codes for discounts
- Receive instant booking confirmation

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd bookit-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variable:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Adjust the API URL to match your backend endpoint.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be running at: **http://localhost:5173**

---

## 🧱 Project Structure

```
bookit-frontend/
├── package.json
├── vite.config.ts
├── .env.example
├── .env
├── .gitignore
├── index.html                  # Default from Vite
├── public/                     # Static assets
├── src/
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Main App component
│   ├── index.css               # Global styles (Tailwind imports)
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Common components
│   │   │   ├── Header.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── experience/         # Experience-related components
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── ExperienceDetails.tsx
│   │   │   └── DateTimeSelector.tsx
│   │   └── checkout/           # Checkout-related components
│   │       ├── CheckoutForm.tsx
│   │       ├── PriceSummary.tsx
│   │       └── ConfirmationCard.tsx
│   ├── pages/                  # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── DetailsPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── ConfirmationPage.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useExperiences.ts
│   │   └── useBooking.ts
│   ├── services/               # API services
│   │   ├── api.ts
│   │   ├── experienceService.ts
│   │   ├── bookingService.ts
│   │   └── promoService.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Helper functions
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── context/                # Global state management
│       └── BookingContext.tsx
└── README.md
```

---

## 🧩 Build for Production

To build the app for production:

```bash
npm run build
```

The optimized output will be in the `dist` directory.

---

## 🌐 Deployment

You can deploy this app easily to:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- Any static hosting service

---

### 💡 Author

**Pradumya Gaurav**

> Crafted with ❤️ using React + TypeScript + Tailwind
