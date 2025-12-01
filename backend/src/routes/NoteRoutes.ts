import * as NotesController from "../controllers/NotesController";
import express from "express";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/getNote/:id", NotesController.getNote);

router.post("/createNote", NotesController.createNote);

router.put("/updateNote/:id", NotesController.updateNote);

router.delete("/deleteNote/:id", NotesController.deleteNote);

export default router;
