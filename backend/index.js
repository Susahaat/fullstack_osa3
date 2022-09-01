const express = require("express");
const app = express();
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

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

let date = new Date();

app.get("/info", (req, res) => {
  res.send(
    "<p>Phonebook has info for " + persons.length + " people.</p>" + date
  );
});

app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const names = persons.map((person) => person.name);
  const numbers = persons.map((person) => person.number);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (names.includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100),
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
