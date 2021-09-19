import React from 'react'
import { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Header from './components/Header'
import Book from './components/Book'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
const BooksApp = () => {

  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [books, setBooks] = useState([])
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const updateBookShelf = (book, whereTo) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);

  }


  useEffect(() => {
    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data)
        )
      }
      )
  }, [])

  useEffect(() => {
    let active = true;
    if (query) {
      BooksAPI.search(query).then(
        data => {
          if (data.error) {
            setSearchBooks([])
          }
          else {
            if (active)
              setSearchBooks(data)
          }
        }
      )
    }
    return () => {
      active = false;
      setSearchBooks([])
    }
  }, [query]
  )

  useEffect(() => {
    const combined = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id)
      }
      else {
        return book;
      }
    })
    setMergedBooks(combined)
  }, [searchBooks])


  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book =>
      map.set(book.id, book)
    )
    return map;
  }



  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search"  >
            {/* search page */}
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {mergedBooks.map((b) =>
                  (<li key={b.id}>
                    <Book book={b} changeBookShelf={updateBookShelf} />
                    {console.log(b)}
                  </li>)
                  )}
                </ol>
              </div>
            </div>
          </Route  >
          <Route path="/">
            {/* main page */}
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default BooksApp