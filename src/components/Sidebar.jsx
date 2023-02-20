import React from "react";

export default function Sidebar({
  newNote,
  notes,
  currentNote,
  setCurrentNoteId,
  deleteNote,
}) {
  const getNoteTitle = (content) => {
    return content.split("\n")[0].replace(/[^a-z0-9 -]/gi, "");
  };

  return (
    <section className="overflow-y-auto w-1/5 h-screen">
      <div className="flex justify-around items-center">
        <h3 className="text-[1.75rem]">Notes</h3>
        <button
          className="h-[30px] text-white flex items-center justify-center bg-[#0066d4] w-[30px]"
          onClick={newNote}
        >
          +
        </button>
      </div>
      {notes.map((note, index) => (
        <div key={index}>
          <div
            className={`overflow-hidden font-semibold px-4 py-3 w-full cursor-pointer flex justify-between items-center ${
              note.id === currentNote.id ? "bg-[#0066d4] text-white " : ""
            }`}
            onClick={() => setCurrentNoteId(note.id)}
          >
            <h4 className="text-[15px] font-semibold leading-[1.2rem] text-[#0066d4] text-[color:var(--clr-accent)] whitespace-nowrap overflow-hidden text-ellipsis">
              {getNoteTitle(note.body)}
            </h4>
            <button
              className=" border-[none]"
              onClick={(event) => deleteNote(event, note.id)}
            >
              <span className="box-border font-bold  cursor-pointer">X</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
