import React, { useEffect, useState } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Notes";
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./networks/NotesApi";
import CreateEditNoteDialog from "./components/CreateEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [createNoteDialog, setCreateNoteDialog] = useState(false);

  const [editNote, setEditNote] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }
    getNotes();
  }, []);

  async function onDelete(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((deletedNote) => deletedNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter}`}
        onClick={() => setCreateNoteDialog(true)}
      >
        Add Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              editNote={setEditNote}
              note={note}
              className={styles.note}
              onDeleteNote={onDelete}
            />
          </Col>
        ))}
      </Row>
      {createNoteDialog && (
        <CreateEditNoteDialog
          onDismiss={() => setCreateNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setCreateNoteDialog(false);
          }}
        ></CreateEditNoteDialog>
      )}
      {editNote && (
        <CreateEditNoteDialog
          editNote={editNote}
          onDismiss={() => setEditNote(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setEditNote(null);
          }}
        ></CreateEditNoteDialog>
      )}
    </Container>
  );
}

export default App;
