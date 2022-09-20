require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("tiny"));
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

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const number = req.body.number;

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
