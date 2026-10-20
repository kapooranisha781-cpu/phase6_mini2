import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/notes", noteRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB error:", error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});