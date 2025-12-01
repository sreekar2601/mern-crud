import { Note } from "../models/notes";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("/api/notes", { method: "GET" });
  return response.json();
}

export interface createNote {
  title: string;
  text?: string;
}

export interface updateNote {
  title?: string;
  text?: string;
}

export async function createNote(note: createNote): Promise<Note> {
  const response = await fetchData("api/notes/createNote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(note: updateNote, id: string): Promise<Note> {
  const response = await fetch("api/notes/updateNote/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(id: string) {
  await fetchData("api/notes/deleteNote/" + id, { method: "DELETE" });
}
