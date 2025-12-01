import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import styles from "../styles/Note.module.css";
import { timeFormat } from "../utils/DateTimeFormat";
import { MdDelete } from "react-icons/md";
import stylesUtils from "../styles/utils.module.css";
import { FaPen } from "react-icons/fa";

interface NoteProps {
  note: NoteModel;
  className?: string;
  editNote: (note: NoteModel) => void;
  onDeleteNote: (note: NoteModel) => void;
}
const Note = ({ note, className, editNote, onDeleteNote }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated At " + timeFormat(updatedAt);
  } else {
    createdUpdatedText = "Created At " + timeFormat(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <div className={`${stylesUtils.flexCenter} ms-auto`}>
            <FaPen
              size={20}
              className="text-muted"
              onClick={() => editNote(note)}
            />
            <MdDelete
              size={20}
              className="text-muted "
              onClick={(e) => {
                onDeleteNote(note);
                e.stopPropagation();
              }}
            />
          </div>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
