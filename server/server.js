const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/moongose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT || 3000;

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
app.delete('/todos/:id', (req, res) => { 
    //get the id
    var id = req.params.id;
    //validate the id => not valid? return 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    //remove todo by id
    Todo.findByIdAndRemove(id).then(todo =>{
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send(todo);
    }).catch(e => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']); //para que el usuario solo pueda modificar estas propiedades

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); //nosotros si podemos modifgicarlo
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true //traer el nuevo
    }).then(todo => {
        if(!todo) {
            return res.status(400).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']); //para que el usuario solo pueda modificar estas propiedades
    let user = new User(body);
 
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch(e => {
        res.status(400).send(e);
    });
    
});

app.get('/users/me', authenticate,  (req, res) => { //para poder usarlo aca >:v //>>authenticate.js : para no repetir el codigo de verificar el x-auth, se crea un middlewere
    res.send(req.user);
});

app.listen(port, () => {
    console.log('Started on port', port);
});

module.exports = {app};