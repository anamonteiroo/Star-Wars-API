import express from 'express';
import morgan from "morgan";
import mongoose from "mongoose";
import getFilms from "./Services/callPlanets.js"

// Configuração banco de dados
const dbUrl = 'mongodb+srv://admin:<password>@cluster0.3kg4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Estamos conectados no MongoDB');
})

const planetsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filmes: String,
  nome: String,
  clima: String,
  terreno: String
});

const planetsModel = mongoose.model('Planet', planetsSchema);
const port = 3000;
const server = express();
const theUrl = '/';

// Configuração middleware morgan
server.use(morgan("tiny"));

// Acessar o body da requisição e converter para JSON
server.use(express.json());

// Ativação da API externa
const activateFilmes = getFilms();

// Listar planetas 
server.get(theUrl, (req, res) => {
  planetsModel.find((err, planet) => {
    if(err) res.status(500).send(err);
    res.json(planet);
  });
});

// Buscar por id
server.get(`${theUrl}:id`, (req, res) => {
  
  planetsModel.findById(req.params.id, (err, planet) => {
    if(planet) {
      res.json(planet);
    } else {
      res.status(404).send(`Planeta com id ${req.params.id} não encontrado`);
    }
  });
});

// Buscar por nome
server.get(theUrl, (req, res) => {
  planetsModel(req.query.nome, (err, planet) => {
    if(planet) {
      res.json(planet);
    } else {
      res.status(404).send(`Planeta com nome ${req.query.nome} não encontrado`);
    }
  });
}); 

// Adicionar um planeta (com nome, clima e terreno)
server.post(theUrl, (req, res) => {
  let quants = 0;
  activateFilmes.then((planets) => {
    for (const planet of planets) {
      if (planet.Planet.toLowerCase() === req.body.nome.toLowerCase()) {
        quants = planet.Quantidade;
      };
     };
  }).then(() => {
    const id = new mongoose.Types.ObjectId();
  const planetToSave = Object.assign({
    _id: id,
    filmes: quants
  }, req.body);

  const planet = new planetsModel(planetToSave);

  planet.save().then((err, planet) => {
    if(err) res.status(500).send(err);
    res.status(201).json(planet);
  });
});
  })

// Remover planeta
server.delete(`${theUrl}:id`, (req, res) => {

  planetsModel.findByIdAndDelete(req.params.id, (err, planet) => {
    if(err) res.status(500).send(err);
    res.status(200).send(`Planeta com o id ${req.params.id} deletado com sucesso.`);
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});