import { RequestHandler } from "express";
import NoteModel from "../models/notes";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Not a correct id format");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNote {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNote,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Title is mandatory, no title found");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  id: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Not a valid Id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Title not found");
    }
    const Note = await NoteModel.findById(id).exec();
    if (!Note) {
      throw createHttpError(404, "Note not found");
    }
    Note.title = newTitle;
    Note.text = newText;

    const updatedNote = await Note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(404, "id not found");
    }
    const note = await NoteModel.findByIdAndDelete(id);
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
