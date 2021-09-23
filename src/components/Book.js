import React from 'react';
import noCover from '../icons/noCover.png';

const Book = ({ book, changeBookShelf }) => {
    const coverImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover;

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${coverImage})` }} />
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => changeBookShelf(book, e.target.value)}  >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">none</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title ? book.title : 'No title available'}</div>
            <div className="book-authors">{book.authors}</div>
        </div >
    )
}
export default Book;