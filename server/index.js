const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let libraryBooks = [];

// ✅ GET – returnează lista de cărți
app.get("/books", (req, res) => {
  res.json(libraryBooks);
});

// ✅ POST – adaugă o carte nouă
app.post("/books", (req, res) => {
  const { title, borrower, dueDate } = req.body;
  if (!title || !borrower || !dueDate) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const newBook = {
    id: Date.now(),
    title,
    borrower,
    dueDate,
    returned: false,
  };
  libraryBooks.push(newBook);
  res.json(newBook);
});

// ✅ PUT – schimbă statusul Borrowed/Returned
app.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  libraryBooks = libraryBooks.map((book) =>
    book.id === bookId ? { ...book, returned: !book.returned } : book
  );
  res.json({ success: true });
});

// ✅ DELETE – șterge o carte
app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  libraryBooks = libraryBooks.filter((book) => book.id !== bookId);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
