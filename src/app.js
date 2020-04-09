const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).send();
  }

  repositories[index] = {
    ...repositories[index],
    title,
    url,
    techs,
  };

  return response.json(repositories[index]);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return res.status(400).send();
  }

  repositories.splice(index, 1);

  return res.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).send();
  }

  repositories[index].likes += 1;

  return response.json(repositories[index]);
});

module.exports = app;
