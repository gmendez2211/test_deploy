const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  creditos: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cantPages: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const alumnosSchema = new mongoose.Schema({
  Canet: {
    type: String,
    required: true,
  },
  Estudiante: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Seccion: {
    type: String,
    require: true,
  },
});

module.exports = {
  cursoSchema,
  bookSchema,
  alumnosSchema,
};
