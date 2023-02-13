import React from "react";
import Header from './Header';
import NoteInput from "./NoteInput";
import NotesList from './NoteList';
import Footer from './Footer'; 
import { getInitialData } from './../utils/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            unfilteredNotes: getInitialData()
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onAddNewNoteHandler = this.onAddNewNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    }

    onSearchHandler(text) {
        if (text.length !== 0 && text.trim() !== '') {
            this.setState({
                notes: this.state.unfilteredNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()))
            })
        } else {
            this.setState({
                notes: this.state.unfilteredNotes
            })
        }
    }

    onAddNewNoteHandler({ title, note }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title: title,
                        body: note,
                        createdAt: (new Date()).toISOString(),
                        archived: false
                    }
                ],
                unfilteredNotes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title: title,
                        body: note,
                        createdAt: (new Date()).toISOString(),
                        archived: false
                    }
                ]
            }
        });
    }

    onDeleteNoteHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.filter(note => note.id !== id),
                unfilteredNotes: prevState.notes.filter(note => note.id !== id)
            }
        })
        toast.success('Note Successfully Deleted');
    }

    onArchiveNoteHandler(id) {
        const noteToModify = this.state.unfilteredNotes.filter(note => note.id === id)[0];
        const modifiedNote = { ...noteToModify, archived: !noteToModify.archived };
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes.filter(note => note.id !== id),
                    modifiedNote
                ],
                unfilteredNotes: [
                    ...prevState.unfilteredNotes.filter(note => note.id !== id),
                    modifiedNote
                ],
            }
        });
        if (noteToModify.archived) {
            toast.success('Note Unarchived Successfully');
        } else {
            toast.success('Note Archived Successfully');
        }
    }
    
    render() {
        return (
            <div>
                <Header onSearch={this.onSearchHandler} />
                <div className="note-app__body">
                    <NoteInput addNewNote={this.onAddNewNoteHandler} />
                    <h2>Active</h2>
                    <NotesList notesList={this.state.notes.filter(note => !note.archived)} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} />
                    <h2>Archive</h2>
                    <NotesList notesList={this.state.notes.filter(note => note.archived)} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} />
                    <Footer />
                    <ToastContainer
                        position="bottom-center"
                    />
                </div>
            </div>
        )
    }
}

export default NotesApp;