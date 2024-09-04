const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

//const uri = "mongodb://localhost:27017/test";
const uri =
  "mongodb+srv://pruebasprobyteg:AiVeYwcdlOwEj3xN@cluster0.st4ba.mongodb.net/dbAlumnos?retryWrites=true&w=majority&appName=Cluster0";
const { authorModel, estudianteModel } = require("./models/Modelos");

const app = express();

const port = process.env.PORT || 9000;

//app.listen(port, () => console.log("Escuchando en el puerto ", port));

app.use(express.json());

app.options("*", cors()); // include before other routess

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Conexiion
//mongoose
//  .connect(
//    uri
//{
//useNewUrlParser: true,
//useUnifiedTopology: true,
//}
//  )
//  .then(() => {
//    console.log("Connection success");
//app.listen(port, () => {
// console.log(`Server listen on http://localhost:${port}`);
// }
//);
//  })
//  .catch((error) => {
//    console.error("Connection fail", error);
//  });

//GET
/*
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
*/
//GET Estudiantes por carnet
app.get("/estudiantes/:Carnet", cors(), async (req, res) => {
  const sCarnet = req.params.Carnet;
  try {
    const Alumnos = await estudianteModel.find({ Carnet: sCarnet });
    return res.json(Alumnos);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET Lista todo los estuddiantes
app.get("/estudiantes", cors(), async (req, res) => {
  try {
    const Alumnos = await estudianteModel.find({});
    return res.json(Alumnos);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//POST
app.post("/authors", cors(), async (req, res) => {
  try {
    const name = req.body?.name;
    const age = req.body?.age;

    if (!name || !age) {
      return res
        .status(400)
        .json({ message: "Bad request, name or age not found" });
    }
    const _authors = new authorModel({
      name,
      age,
    });

    const save = await _authors.save();
    return res.status(201).json({ authors: save });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection success");
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection fail", error);
  });
