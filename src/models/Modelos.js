const mongoose = require("mongoose");
const {
  cursoSchema,
  bookSchema,
  alumnosSchema,
} = require("../schemas/schemas");

const authorModel = mongoose.model("cursos", cursoSchema);
const bookModel = mongoose.model("Book", bookSchema);
const estudianteModel = mongoose.model("Alumnos_Desa_Web", alumnosSchema);

module.exports = {
  authorModel,
  bookModel,
  estudianteModel,
};
