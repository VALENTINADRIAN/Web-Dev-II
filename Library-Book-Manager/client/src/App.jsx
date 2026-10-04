import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [borrower, setBorrower] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetch("https://book-manager-backend.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error loading books:", err));
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    if (!title || !borrower || !dueDate) return;

    fetch("https://book-manager-backend.onrender.com/books"{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, borrower, dueDate }),
    })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error adding book:", err));

    setTitle("");
    setBorrower("");
    setDueDate("");
  };

  return (
    <div className="container">
      <h1>Library Book Manager</h1>
      <p>Keep track of borrowed books and due dates</p>

      <div className="form-section">
        <h2>Borrow New Book</h2>
        <form onSubmit={addBook}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Borrower Name"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Borrowed Books ({books.length})</h2>
        {books.length === 0 ? (
          <p>No books borrowed right now.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <strong>{book.title}</strong> — borrowed by {book.borrower} (due {book.dueDate})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
