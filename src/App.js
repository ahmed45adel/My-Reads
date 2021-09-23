import React from "react";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelves from "./components/Shelves";
import Header from "./components/Header";
import Book from "./components/Book";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const AppOfBooks = () => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setsearchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [BooksMerge, setBooksMerge] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  useEffect(
    () => {
      let active = true;
      if (query) {
        BooksAPI.search(query).then((data) => {
          if (data.error) {
            setsearchedBooks([]);
          } else {
            if (active) setsearchedBooks(data);
          }
        });
      }
      return () => {
        active = false;
        setsearchedBooks([]);
      };
    },
    [query]
  );

  useEffect(
    () => {
      const totalBooks = searchedBooks.map((book) => {
        if (books.filter((e) => e.id === book.id).length) {
          return books.filter((e) => e.id === book.id)[0];
        } else {
          return book;
        }
      });
      setBooksMerge(totalBooks);
    },
    [searchedBooks]
  );

  //update book state
  const updateBookState = (book, newShelf) => {
    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...book, shelf: newShelf } : b
    );
    !books.filter((e) => e.id === book.id).length && {
      ...book,
      shelf: newShelf,
    } &&
      updatedBooks.push(book);
    setBooks(updatedBooks);
    BooksAPI.update(book, newShelf);
  };
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search">
            {/* search page */}
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {BooksMerge.map((b) => (
                    <li key={b.id}>
                      <Book book={b} changeBookShelf={updateBookState} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Route>
          <Route path="/">
            {/* main page */}
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookState} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AppOfBooks;