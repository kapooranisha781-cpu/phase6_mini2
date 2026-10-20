import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// POST - Save note
router.post("/", async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });

        await note.save();

        res.json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET - Get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({
            createdAt: -1
        });

        res.json(notes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;