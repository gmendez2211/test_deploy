const mongoose = require("mongoose");
const {
  authorSchema,
  bookSchema,
  alumnosSchema,
} = require("../schemas/schemas");

const authorModel = mongoose.model("_Author", authorSchema);
const bookModel = mongoose.model("Book", bookSchema);
const estudianteModel = mongoose.model("Alumnos_Desa_Web", alumnosSchema);

module.exports = {
  authorModel,
  bookModel,
  estudianteModel,
};
