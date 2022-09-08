require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");

app.use(express.json());
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.static("build"));
morgan.token("person", (req, res) => {
  if (req.method !== "POST") {
    return null;
  } else {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :person")
);
const cors = require("cors");
app.use(cors());

let date = new Date();

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      "<p>Phonebook has info for " + result.length + " people.</p>" + date
    );
  });
});

app.get("/api/persons/", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.find({}).then((result) => {
    const person = result.find((person) => person._id.toJSON() == id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.deleteOne({ _id: id }).then((result) => {
    res.status(204).end();
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  // const names = persons.map((person) => person.name);
  // const numbers = persons.map((person) => person.number);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  // } else if (names.includes(body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
