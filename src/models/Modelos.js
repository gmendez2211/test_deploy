const mongoose = require("mongoose");
const { authorSchema, bookSchema } = require("../schemas/schemas");

const authorModel = mongoose.model("_Author", authorSchema);
const bookModel = mongoose.model("Book", bookSchema);
const EstudianteModel = mongoose.model("Estudiante", bookSchema);

module.exports = {
  authorModel,
  bookModel,
  EstudianteModel,
};
