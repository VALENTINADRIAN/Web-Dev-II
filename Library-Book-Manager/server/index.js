const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let libraryBooks = [];

app.get("/books", (req, res) => {
  res.json(libraryBooks);
});

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
  };

  libraryBooks.push(newBook);
  res.json(libraryBooks);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
