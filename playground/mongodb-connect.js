// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


// var obj = new ObjectID();
// console.log(obj);

// var user = {name:'andrew', age:25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => { //err=error, db=db object
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) return console.log('Unable to insert todo.', err);

    //     console.log(JSON.stringify(result.ops, undefined, 3));//guarda todo lo que se inserto en esta operacion de insertOne
    // });

    //Insert new doc into Users colelction: (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Oscar Montes',
    //     age: 20,
    //     location: 'Mexico'
    // }, (err, result) => {
    //     if (err) return console.log('Unable to insert user.', err);

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 3));//guarda todo lo que se inserto en esta operacion de insertOne
    // });

    client.close();
});