# 📘 BookIt - Experiences & Slots Backend API

This is the **backend API** for the **BookIt Experiences & Slots** application, designed to handle experiences, bookings, and promo validations efficiently.

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd bookit-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   NODE_ENV=development
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server will be running at: **http://localhost:5000**

---

## 🔗 API Endpoints

### 🎯 Experiences

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/experiences`     | Get all experiences           |
| GET    | `/api/experiences/:id` | Get a single experience by ID |

### 🧾 Bookings

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/api/bookings` | Create a new booking |

### 💸 Promo Codes

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/promo/validate` | Validate a promo code |

---

## 📚 API Documentation

For detailed API documentation, refer to the Postman collection _(link to be added)_.

---

## 🗂️ Project Structure

```
bookit-backend/
├── package.json
├── tsconfig.json
├── .env.example
├── .env
├── .gitignore
├── src/
│   ├── index.ts                  # Main entry point
│   ├── app.ts                    # Express app setup
│   ├── config/                   # Configuration files
│   │   └── database.ts           # MongoDB connection
│   ├── models/                   # MongoDB schemas
│   │   ├── Experience.ts         # Experience model (includes slots)
│   │   ├── Booking.ts            # Booking model
│   │   └── PromoCode.ts          # Promo code model
│   ├── controllers/              # Route controllers
│   │   ├── experienceController.ts
│   │   ├── bookingController.ts
│   │   └── promoController.ts
│   ├── routes/                   # API routes
│   │   ├── experienceRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   └── promoRoutes.ts
│   ├── middleware/               # Custom middleware
│   │   ├── errorHandler.ts
│   │   └── validator.ts          # Input validation
│   ├── utils/                    # Utility functions
│   │   └── helpers.ts
│   └── types/                    # TypeScript type definitions
│       └── index.ts
└── README.md
```

---

## 🪪 License

This project is licensed under the **MIT License**.

---

### 💡 Author

**Pradumya Gaurav**

> Built with ❤️ using Node.js & TypeScript