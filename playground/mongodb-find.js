// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => { //err=error, db=db object
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bd249eae23f2b27b40ec53c')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 3));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ', count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Oscar Montes'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 3));
    });

    client.close();
});