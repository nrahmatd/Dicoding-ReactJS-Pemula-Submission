import React from "react";
import SearchBar from './SearchBar';

function Header({ onSearch }) {
    return (
        <div className="note-app__header">
            <h1>My Personal Note</h1>
            <SearchBar onSearch={onSearch} />
        </div>
    );
}

export default Header;