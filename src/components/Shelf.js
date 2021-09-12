import React from 'react';
import Book from './Book';

const Shelf = ({ books }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((b, id) =>
                    (<li key={id}>
                        <Book book={b} />
                    </li>)
                    )}
                </ol>
            </div>
        </div>
    )

}

export default Shelf;