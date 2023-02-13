import React from "react";
 
function SearchBar({ onSearch }) {
    const onSearchChange = function (event) {
        onSearch(event.target.value);
    }

    return (
        <div className="note-search">
            <input type="text" placeholder="Search notes" onChange={onSearchChange} />
        </div>
    );
}

export default SearchBar;