const express = require("express");
const mongoose = require("mongoose");
//const uri = "mongodb://localhost:27017/test";
const uri =
  "mongodb+srv://pruebasprobyteg:AiVeYwcdlOwEj3xN@cluster0.st4ba.mongodb.net/DBAluumnos?retryWrites=true&w=majority&appName=Cluster0";
const { authorModel, EstudianteModel } = require("./models/Modelos");

const app = express();

const port = process.env.PORT || 9000;

app.listen(port, () => console.log("Escuchando en el puerto ", port));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Conexiion
mongoose
  .connect(
    uri
    //{
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //}
  )
  .then(() => {
    console.log("Connection success");
    //app.listen(port, () => {
    // console.log(`Server listen on http://localhost:${port}`);
    // }
    //);
  })
  .catch((error) => {
    console.error("Connection fail", error);
  });

//GET
app.get("/authors", async (req, res) => {
  try {
    const _Authors = await authorModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        },
      },
    ]);
    return res.json({ _Authors });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET Estudiantes
app.get("/Estudiantes", async (req, res) => {
  try {
    const Estudiantes = await EstudianteModel.find({});
    return res.json({ Estudiantes });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//POST
app.post("/authors", async (req, res) => {
  try {
    const name = req.body?.name;
    const age = req.body?.age;

    if (!name || !age) {
      return res
        .status(400)
        .json({ message: "Bad request, name or age not found" });
    }
    const _author = new authorModel({
      name,
      age,
    });

    const save = await _author.save();
    return res.status(201).json({ author: save });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
