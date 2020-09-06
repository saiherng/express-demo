const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Computer Sciece" },
  { id: 2, name: "Data Structures" },
  { id: 3, name: "Algorithms" },
];

app.get("/", (req, res) => {
  res.send("This is an demo api with express!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The id not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Update course
  course.name = req.body.name;
  res.send(course);
});

// api/courses/1
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("The id not found");
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course id was not found");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
