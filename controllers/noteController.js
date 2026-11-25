// In-memory data store (resets whenever the server restarts)
let notes = [
  { id: 1, title: "Learn Express", content: "Build a REST API with Express.", category: "Study" },
  { id: 2, title: "Buy groceries", content: "Milk, eggs, bread, vegetables.", category: "Personal" },
  { id: 3, title: "Team meeting", content: "Sprint planning at 10 AM on Monday.", category: "Work" },
];

// Helper: find a note's index by the :id param (-1 if not found or invalid)
const findNoteIndex = (idParam) => {
  const id = Number(idParam);
  if (Number.isNaN(id)) return -1;
  return notes.findIndex((note) => note.id === id);
};

// GET /api/notes
const getAllNotes = (req, res) => {
  res.status(200).json(notes);
};

// GET /api/notes/:id
const getNoteById = (req, res) => {
  const index = findNoteIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(notes[index]);
};

// POST /api/notes
const createNote = (req, res) => {
  const { title, content, category } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    category: category || "General",
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

// PUT /api/notes/:id
const updateNote = (req, res) => {
  const index = findNoteIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const { title, content, category } = req.body || {};

  // Update only the fields that were provided
  if (title !== undefined) notes[index].title = title;
  if (content !== undefined) notes[index].content = content;
  if (category !== undefined) notes[index].category = category;

  res.status(200).json(notes[index]);
};

// DELETE /api/notes/:id
const deleteNote = (req, res) => {
  const index = findNoteIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const [deletedNote] = notes.splice(index, 1);
  res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
