# BookIt: Experiences & Slots 🌍✈️

## 📌 Overview

BookIt is a comprehensive full-stack web application that provides a seamless experience for users to discover, browse, and book travel experiences. Built using modern web technologies, this application demonstrates advanced frontend and backend development skills with a focus on user experience and performance.

The application follows a complete booking flow: browsing experiences on the home page, selecting an experience, choosing available dates and times, specifying the number of participants, completing checkout with personal information and optional promo codes, and receiving booking confirmation.

## 🔗 Live Demo

- **Frontend**: [BookIt Web App](https://bookit-project-seven.vercel.app/)
- **Backend API**: [BookIt API](https://bookit-backend-seven.vercel.app)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture & Design](#-architecture--design)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Development Workflow](#-development-workflow)
- [Deployment Guide](#-deployment-guide)
- [Testing](#-testing)
- [Performance Optimizations](#-performance-optimizations)
- [Future Enhancements](#-future-enhancements)
- [Challenges & Solutions](#-challenges--solutions)
- [Contact](#-contact)

## ✨ Features

### Core Functionality
- **Experience Browsing**: Intuitive interface to discover and browse various travel experiences
- **Search & Filter**: Powerful search functionality to find experiences by name, location, or activity type
- **Experience Details**: Comprehensive view of experience information, including images, descriptions, and availability
- **Date & Time Selection**: Interactive calendar and time slot selection with real-time availability updates
- **Dynamic Pricing**: Automatic calculation of pricing based on participant quantity
- **Checkout Process**: Streamlined checkout with personal information collection
- **Promo Code System**: Support for percentage and fixed-amount discount codes
- **Booking Confirmation**: Detailed booking confirmation with reference number and booking details
- **Responsive Design**: Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices

### Technical Features
- **Type Safety**: Full TypeScript implementation throughout both frontend and backend
- **State Management**: Advanced state management using React Context API
- **API Integration**: Clean separation of concerns with service-based API integration
- **Custom Hooks**: Reusable React hooks for business logic and data fetching
- **Form Validation**: Comprehensive client-side and server-side validation
- **Error Handling**: Robust error handling and user feedback mechanisms
- **Responsive Layout**: Mobile-first design approach using Tailwind CSS
- **MongoDB Integration**: Efficient database operations with Mongoose ODM
- **RESTful API**: Well-structured API following REST principles

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router v6 for navigation and route management
- **Styling**: Tailwind CSS for utility-first styling
- **HTTP Client**: Axios for API requests
- **State Management**: React Context API with custom hooks
- **Form Handling**: Custom validation and state management
- **Date Handling**: Native Date object with custom formatting utilities

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript for type safety and better development experience
- **Database**: MongoDB with Mongoose ODM
- **API Architecture**: RESTful API design
- **Validation**: Custom middleware for request validation
- **Error Handling**: Centralized error handling middleware
- **Environment Management**: dotenv for environment variable management

### Development & Deployment
- **Version Control**: Git with GitHub
- **Linting & Formatting**: ESLint and Prettier
- **Deployment**: Vercel for both frontend and backend
- **Database Hosting**: MongoDB Atlas

## 🏗 Architecture & Design

### Frontend Architecture
The frontend follows a component-based architecture with clear separation of concerns:

- **Components**: Reusable UI building blocks organized by feature/domain
- **Pages**: Top-level components that compose multiple components
- **Context**: Application state management using React Context API
- **Hooks**: Custom hooks for reusable business logic
- **Services**: API integration layer for data fetching
- **Types**: TypeScript interfaces and types for type safety
- **Utilities**: Helper functions for common operations

### Backend Architecture
The backend follows the MVC (Model-View-Controller) pattern:

- **Models**: MongoDB schemas and data models
- **Controllers**: Business logic for handling requests
- **Routes**: API endpoint definitions
- **Middleware**: Request processing and validation
- **Configuration**: Application configuration management
- **Utilities**: Helper functions and common utilities

### Data Flow
1. User interacts with the UI
2. React components update state via Context API
3. Services make API requests to the backend
4. Backend controllers process requests
5. Models interact with the database
6. Response flows back through controllers to the frontend
7. UI updates based on the response data

## 📁 Project Structure

The project is organized as a monorepo containing both frontend and backend code:
```
bookit-project/
├── frontend/                # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Shared components (Button, Header, etc.)
│   │   │   ├── experience/  # Experience-specific components
│   │   │   └── checkout/    # Checkout-related components
│   │   ├── context/         # React Context providers
│   │   │   └── BookingContext.tsx  # Booking state management
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useExperiences.ts   # Experience data fetching
│   │   │   └── useBooking.ts       # Booking operations
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx        # Experience listing page
│   │   │   ├── DetailsPage.tsx     # Experience details page
│   │   │   ├── CheckoutPage.tsx    # Booking checkout page
│   │   │   └── ConfirmationPage.tsx # Booking confirmation
│   │   ├── services/        # API service functions
│   │   │   ├── api.ts              # API client configuration
│   │   │   ├── experienceService.ts # Experience-related API calls
│   │   │   ├── bookingService.ts   # Booking-related API calls
│   │   │   └── promoService.ts     # Promo code validation
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── index.ts            # Type declarations
│   │   ├── utils/           # Utility functions
│   │   │   ├── formatters.ts       # Date and currency formatting
│   │   │   └── validators.ts       # Form validation
│   │   ├── App.tsx          # Main application component
│   │   ├── main.tsx         # Application entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── tsconfig.json        # TypeScript configuration
│   ├── vite.config.ts       # Vite configuration
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Frontend documentation
│
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── config/          # Configuration files
    │   │   └── database.ts  # MongoDB connection setup
    │   ├── controllers/     # Route controllers
    │   │   ├── experienceController.ts # Experience endpoints
    │   │   ├── bookingController.ts    # Booking endpoints
    │   │   └── promoController.ts      # Promo code endpoints
    │   ├── middleware/      # Express middleware
    │   │   ├── errorHandler.ts # Error handling middleware
    │   │   └── validator.ts    # Request validation
    │   ├── models/          # MongoDB schemas
    │   │   ├── Experience.ts # Experience model
    │   │   ├── Booking.ts    # Booking model
    │   │   └── PromoCode.ts  # Promo code model
    │   ├── routes/          # API routes
    │   │   ├── experienceRoutes.ts # Experience routes
    │   │   ├── bookingRoutes.ts    # Booking routes
    │   │   └── promoRoutes.ts      # Promo code routes
    │   ├── utils/           # Utility functions
    │   │   └── helpers.ts   # Helper functions
    │   ├── types/           # TypeScript type definitions
    │   │   └── index.ts     # Type declarations
    │   ├── app.ts           # Express app setup
    │   └── index.ts         # Server entry point
    ├── tsconfig.json        # TypeScript configuration
    ├── vercel.json          # Vercel deployment configuration
    ├── package.json         # Dependencies and scripts
    └── README.md            # Backend documentation
```

## 📚 API Documentation

The BookIt API provides endpoints for managing experiences, bookings, and promo codes:

### Experiences

#### Get All Experiences
- **Endpoint**: `GET /api/experiences`
- **Description**: Retrieves a list of all available experiences
- **Response**: 
```json
  {
    \"success\": true,
    \"count\": 5,
    \"data\": [
      {
        \"_id\": \"607f191e810c19729de860ea\",
        \"title\": \"Kayaking\",
        \"location\": \"Udupi\",
        \"price\": 999,
        \"imageUrl\": \"https://example.com/image.jpg\"
      },
      // More experiences...
    ]
  }
```

#### Get Experience by ID
- **Endpoint**: `GET /api/experiences/:id`
- **Description**: Retrieves detailed information about a specific experience
- **Parameters**: 
  - `id`: Experience ID
- **Response**: 
```json
  {
    \"success\": true,
    \"data\": {
      \"_id\": \"607f191e810c19729de860ea\",
      \"title\": \"Kayaking\",
      \"description\": \"Explore the beautiful mangroves by kayak with expert guides.\",
      \"location\": \"Udupi\",
      \"price\": 999,
      \"imageUrl\": \"https://example.com/image.jpg\",
      \"slots\": [
        {
          \"date\": \"2025-10-22T00:00:00.000Z\",
          \"times\": [
            {
              \"time\": \"07:00\",
              \"available\": 4
            },
            // More time slots...
          ]
        },
        // More dates...
      ]
    }
  }
```

### Bookings

#### Create Booking
- **Endpoint**: `POST /api/bookings`
- **Description**: Creates a new booking
- **Request Body**: 
```json
  {
    \"experienceId\": \"607f191e810c19729de860ea\",
    \"fullName\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"date\": \"2025-10-22T00:00:00.000Z\",
    \"time\": \"09:00\",
    \"quantity\": 2,
    \"promoCode\": \"SAVE10\"
  }
```
- **Response**: 
```json
  {
    \"success\": true,
    \"data\": {
      \"bookingId\": \"HUF56&SO\",
      \"experienceTitle\": \"Kayaking\",
      \"date\": \"2025-10-22T00:00:00.000Z\",
      \"time\": \"09:00\",
      \"quantity\": 2,
      \"subtotal\": 1798,
      \"taxes\": 108,
      \"total\": 1906
    }
  }
```

### Promo Codes

#### Validate Promo Code
- **Endpoint**: `POST /api/promo/validate`
- **Description**: Validates a promo code and returns discount information
- **Request Body**: 
```json
  {
    \"code\": \"SAVE10\",
    \"subtotal\": 999
  }
```
- **Response**: 
```json
  {
    \"success\": true,
    \"data\": {
      \"code\": \"SAVE10\",
      \"type\": \"percentage\",
      \"value\": 10,
      \"discount\": 99.9,
      \"discountedSubtotal\": 899.1
    }
  }
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or Atlas account)
- Git

### Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-username/bookit-project.git

# Navigate to project directory
cd bookit-project
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Open .env and add your MongoDB connection string and other settings
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit
# PORT=5000
# NODE_ENV=development

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Once both servers are running:
- Backend API will be available at: http://localhost:5000/api
- Frontend application will be available at: http://localhost:5173

## 💻 Development Workflow

### Backend Development
1. Implement/modify MongoDB schema in `backend/src/models/`
2. Create/update controller logic in `backend/src/controllers/`
3. Define API routes in `backend/src/routes/`
4. Add middleware as needed in `backend/src/middleware/`
5. Test API endpoints using Postman or curl

### Frontend Development
1. Define TypeScript interfaces in `frontend/src/types/`
2. Implement API services in `frontend/src/services/`
3. Create/update components in `frontend/src/components/`
4. Implement page components in `frontend/src/pages/`
5. Update routing in `frontend/src/App.tsx` if needed

### Adding a New Feature
1. Define the feature requirements and design
2. Implement backend changes (models, controllers, routes)
3. Implement frontend services to interact with the API
4. Create UI components and integrate with services
5. Test the feature end-to-end
6. Add documentation for the feature

## 📦 Deployment Guide

### Backend Deployment to Vercel
1. Create a `vercel.json` file in the backend directory:
```json
   {
     \"version\": 2,
     \"builds\": [
       {
         \"src\": \"src/index.ts\",
         \"use\": \"@vercel/node\"
       }
     ],
     \"routes\": [
       {
         \"src\": \"/(.*)\",
         \"dest\": \"src/index.ts\"
       }
     ]
   }
```

2. Install Vercel CLI:
```bash
   npm install -g vercel
```

3. Login and deploy:
```bash
   vercel login
   vercel
```

4. Configure environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production

### Frontend Deployment to Vercel
1. Update the `.env.production` file with your backend URL:
```
   VITE_API_URL=https://your-backend-url.vercel.app/api
```

2. Deploy using Vercel CLI:
```bash
   cd frontend
   vercel
```

3. Configure your project settings as needed
4. Deploy to production:
```bash
   vercel --prod
```

## 🧪 Testing
### Manual Testing Checklist
1. Home page loads and displays experiences
2. Search functionality works correctly
3. Experience details page shows correct information
4. Date and time selection works as expected
5. Quantity selection updates pricing correctly
6. Checkout form validates input properly
7. Promo codes apply discounts correctly
8. Booking confirmation shows after successful checkout
9. Responsive design works on various screen sizes

## ⚡ Performance Optimizations

The BookIt application implements several performance optimizations:

### Frontend Optimizations
- **Code Splitting**: Routes are lazy-loaded for faster initial loading
- **Memoization**: React's useMemo and useCallback hooks to prevent unnecessary re-renders
- **TypeScript**: Static typing helps catch errors during development
- **Tailwind CSS**: Utility-first CSS approach that results in smaller CSS bundles

### Backend Optimizations
- **Database Indexing**: MongoDB indexes for faster queries
- **Connection Pooling**: Efficient database connection management
- **Caching**: Response caching for frequently accessed data
- **Serverless Architecture**: Vercel's serverless functions for scalability

## 🚀 Future Enhancements

The following features could be added to enhance the application:

### User Authentication & Profiles
- User registration and login
- User profiles with booking history
- Saved favorite experiences
- Personalized recommendations

### Advanced Features
- Ratings and reviews for experiences
- Social sharing capabilities
- Interactive maps for location visualization
- Real-time availability updates
- Multi-language support

### Administrative Features
- Admin dashboard for managing experiences
- Analytics and reporting
- Inventory and availability management
- Customer management

### Payment Processing
- Integration with payment gateways
- Support for multiple payment methods
- Invoice generation
- Refund processing

## 🔍 Challenges & Solutions

### Challenge 1: State Management Across Pages
**Problem**: Managing booking state across multiple pages in the booking flow.
**Solution**: Implemented React Context API to create a centralized booking state that persists across page navigation, allowing seamless flow from experience selection to checkout.

### Challenge 2: Date & Time Selection
**Problem**: Creating an intuitive date and time selection UI with availability indicators.
**Solution**: Built a custom date picker and time slot selector that clearly shows available options and prevents selection of unavailable slots.

### Challenge 3: MongoDB Data Modeling
**Problem**: Designing an efficient schema for experiences with varying availability.
**Solution**: Created a flexible nested structure for slots and times that allows for efficient querying while maintaining data integrity.

### Challenge 4: Deployment Configuration
**Problem**: Configuring serverless functions to work with MongoDB connections.
**Solution**: Implemented connection pooling and proper error handling to manage MongoDB connections efficiently in a serverless environment.

## 📞 Contact

### Developer Information
**Pradumya Gaurav**  
Email: [pradumya004@gmail.com](mailto:pradumya004@gmail.com)  
Phone: +91 7574927165

### Project Links
- **GitHub Repository**: [https://github.com/your-username/bookit-project](https://github.com/pradumya004/bookit-project)
- **Frontend Demo**: [https://bookit-six-gamma.vercel.app/](https://bookit-project-seven.vercel.app/)
- **Backend API**: [https://bookit-backend-seven.vercel.app/api](https://bookit-backend-seven.vercel.app)

### License
This project is licensed under the MIT License - see the LICENSE file for details.

---


© 2025 Pradumya Gaurav. All rights reserved."

