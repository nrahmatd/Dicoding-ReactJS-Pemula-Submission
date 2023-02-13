import React from "react";
import { toast } from 'react-toastify';

class NoteInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            note: ''
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onNoteChangeEventHandler = this.onNoteChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value
            }
        });
    }

    onNoteChangeEventHandler(event) {
        if (event.target.value.length <= 200) {
            this.setState(() => {
                return {
                    note: event.target.value
                }
            });
        }
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNewNote(this.state);
        toast.success('Create Note Succesfully');
        this.setState(() => {
            return {
                title: '',
                note: ''
            }
        });
    }

    render() {
        return (
            <div className="note-input">
                <h2>Add New Note</h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="note-input__title__char-limit">Character left: {200 - this.state.note.length}</p>
                    <input
                        className="note-input__title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.onTitleChangeEventHandler}
                        required
                    />
                    <textarea
                        className="note-input__body"
                        type="text"
                        name="note"
                        placeholder="write note..."
                        value={this.state.note}
                        onChange={this.onNoteChangeEventHandler}
                        required
                    />
                    <button type="submit">Create Note</button>
                </form>
            </div>
        );
    }
}

export default NoteInput;