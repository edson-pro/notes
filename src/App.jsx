import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./App.css";
export default function App() {
  const getNotes = () => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  };
  const [notes, setNotes] = useState(getNotes());

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Start here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <div>
      <main>
        {notes.length > 0 ? (
          <Split sizes={[30, 70]} direction="horizontal" className="flex">
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
            )}
          </Split>
        ) : (
          <div className=" w-full h-screen flex flex-col justify-center items-center bg-neutral-100">
            <h1>You have no notes</h1>
            <button
              className=" cursor-pointer p-4 my-6 bg-[#0066d4] text-white rounded-[3px] border-[none]"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
