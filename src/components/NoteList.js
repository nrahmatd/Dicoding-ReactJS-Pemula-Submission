import React from "react";
import NoteItem from "./NoteItem";

function NotesList({notesList, onDelete, onArchive}) {
    return (
        <div>
            {
                notesList.length !== 0 ? 
                <div className="notes-list">
                    {
                        notesList.map(item => (
                            <NoteItem key={item.id} note={item} onDelete={onDelete} onArchive={onArchive} />
                        ))
                    }
                </div> :
                <p className="notes-list__empty-message">No note available.</p>
            }
        </div>
    );
}

export default NotesList;