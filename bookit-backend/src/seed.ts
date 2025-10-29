// bookit-backend/src/seed.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/Experience";
import PromoCode from "./models/PromoCode";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample experience data
const experienceData = [
  {
    title: "Kayaking",
    description:
      "Explore the beautiful mangroves by kayak with expert guides. Safety first with all gear included.",
    location: "Udupi",
    price: 999,
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slots: [
      {
        date: new Date("2025-10-22"),
        times: [
          { time: "07:00", available: 4 },
          { time: "09:00", available: 2 },
          { time: "11:00", available: 5 },
          { time: "13:00", available: 0 },
        ],
      },
      {
        date: new Date("2025-10-23"),
        times: [
          { time: "07:00", available: 4 },
          { time: "09:00", available: 2 },
          { time: "11:00", available: 5 },
          { time: "13:00", available: 2 },
        ],
      },
      {
        date: new Date("2025-10-24"),
        times: [
          { time: "07:00", available: 4 },
          { time: "09:00", available: 2 },
          { time: "11:00", available: 5 },
          { time: "13:00", available: 2 },
        ],
      },
      {
        date: new Date("2025-10-25"),
        times: [
          { time: "07:00", available: 4 },
          { time: "09:00", available: 2 },
          { time: "11:00", available: 5 },
          { time: "13:00", available: 2 },
        ],
      },
      {
        date: new Date("2025-10-26"),
        times: [
          { time: "07:00", available: 4 },
          { time: "09:00", available: 2 },
          { time: "11:00", available: 5 },
          { time: "13:00", available: 2 },
        ],
      },
    ],
  },
  {
    title: "Nandi Hills Sunrise",
    description:
      "Experience the breathtaking sunrise from Nandi Hills with panoramic views and guided exploration.",
    location: "Bangalore",
    price: 899,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    slots: [
      {
        date: new Date("2025-10-22"),
        times: [
          { time: "05:00", available: 4 },
          { time: "05:30", available: 2 },
          { time: "06:00", available: 5 },
        ],
      },
      {
        date: new Date("2025-10-23"),
        times: [
          { time: "05:00", available: 4 },
          { time: "05:30", available: 2 },
          { time: "06:00", available: 5 },
        ],
      },
    ],
  },
  {
    title: "Coffee Trail",
    description:
      "Journey through scenic coffee plantations with expert guidance and tastings of fresh local brews.",
    location: "Coorg",
    price: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1561&q=80",
    slots: [
      {
        date: new Date("2025-10-22"),
        times: [
          { time: "08:00", available: 6 },
          { time: "10:00", available: 3 },
          { time: "13:00", available: 4 },
        ],
      },
    ],
  },
  {
    title: "Boat Cruise",
    description:
      "Relaxing cruise along the pristine coastline with opportunities for dolphin spotting and swimming.",
    location: "Sunderbans",
    price: 999,
    imageUrl:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80",
    slots: [
      {
        date: new Date("2025-10-22"),
        times: [
          { time: "09:00", available: 8 },
          { time: "14:00", available: 8 },
        ],
      },
    ],
  },
  {
    title: "Bunjee Jumping",
    description:
      "Experience the ultimate adrenaline rush with certified instructors and state-of-the-art equipment.",
    location: "Manali",
    price: 999,
    imageUrl:
      "https://images.unsplash.com/photo-1543083115-638c32cd3d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    slots: [
      {
        date: new Date("2025-10-22"),
        times: [
          { time: "10:00", available: 4 },
          { time: "11:00", available: 4 },
          { time: "12:00", available: 4 },
          { time: "13:00", available: 4 },
        ],
      },
    ],
  },
];

// Sample promo codes
const promoCodes = [
  {
    code: "SAVE10",
    type: "percentage" as const,
    value: 10,
    expiryDate: new Date("2026-12-31"),
    isActive: true,
  },
  {
    code: "FLAT100",
    type: "fixed" as const,
    value: 100,
    expiryDate: new Date("2026-12-31"),
    isActive: true,
  },
];

// Seed database function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Experience.deleteMany({});
    console.log("Experiences collection cleared");

    await PromoCode.deleteMany({});
    console.log("PromoCode collection cleared");

    // Insert new data
    const insertedExperiences = await Experience.insertMany(experienceData);
    console.log(`${insertedExperiences.length} experiences inserted`);

    const insertedPromoCodes = await PromoCode.insertMany(promoCodes);
    console.log(`${insertedPromoCodes.length} promo codes inserted`);

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();