let express = require('express');
let bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

//GET /todos/123211
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    //validate id using isValid
    if(!ObjectID.isValid(id)) {
        //stop func exec and pass 404 - send back empty send
        return res.status(404).send();
    }
        
    //sucess
    Todo.findById(id).then(todo => {
        if(!todo) {//if no todo - send back 404-with empty body
            return res.status(404).send();
        }
        //if todo - send it back
        res.status(200).send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });           
});

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

module.exports = {app};