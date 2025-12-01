import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { createNote } from "../networks/NotesApi";
import * as NotesApi from "../networks/NotesApi";

interface AddEditNoteDialogProps {
  editNote?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

export default function CreateEditNoteDialog({
  editNote,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createNote>({
    defaultValues: {
      title: editNote?.title || "",
      text: editNote?.text || "",
    },
  });

  async function onSubmit(input: createNote) {
    let response: Note;
    try {
      if (editNote) {
        response = await NotesApi.updateNote(input, editNote._id);
      } else {
        response = await NotesApi.createNote(input);
      }
      onNoteSaved(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{editNote ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Text"
              {...register("text")}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
