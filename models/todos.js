const mongoose = require("mongoose");
const Joi = require("joi");

const todosSchema = new mongoose.Schema({
  todo: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todos = new mongoose.model("Todos", todosSchema, "todos");

function validateTodos(todo) {
  const schema = Joi.object({
    todo: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(todo);
}

module.exports = { Todos, validateTodos };
