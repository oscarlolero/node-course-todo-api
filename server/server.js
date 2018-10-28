let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/moongose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

app.use(bodyParser.json()); //se pasa la funcion "json" como middlewere a express.

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, e => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => { //obtener todos los todos
        res.send({
            todos
        });
    }, e => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

module.exports = {app};