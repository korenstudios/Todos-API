const express = require("express");
const router = express.Router();
const { Todos, validateTodos } = require("../models/todos");

// Add todo
router.post("/", async (req, res) => {
  const { error } = validateTodos(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const todo = new Todos(req.body);

  await todo.save();

  res.json(todo);
});

// Get all Todos
router.get("/", async (req, res) => {
  const todos = await Todos.find();

  res.json(todos);
});

// Get todo by id
router.get("/:id", async (req, res) => {
  const todo = await Todos.findOne({ _id: req.params.id });

  if (!todo) {
    res.status(404).send("The todo with the given ID was not found");
    return;
  }

  res.json(todo);
});

// Update todo
router.patch("/:id", async (req, res) => {
  const { error } = validateTodos(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const todo = await Todos.findByIdAndUpdate({ _id: req.params.id }, req.body);

  if (!todo) {
    res.status(404).send("The todo with the given ID was not found");
    return;
  }

  res.json(todo);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  const todo = await Todos.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!todo) {
    res.status(404).send("The todo with the given ID was not found");
    return;
  }

  res.json(todo);
});

// Delete all todos
router.delete("/", async (req, res) => {
  const todos = await Todos.deleteMany();

  res.send(`${todos.deletedCount} todos deleted`);
});

module.exports = router;
