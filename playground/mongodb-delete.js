// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => { //err=error, db=db object
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(`Se borraron: ${result.result.n} documentos`);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(`Se borraron: ${result.result.n} documentos`);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Oscar Montes'}).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bd24539dfc7f84240e29b08')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 3));
    });

    client.close();
});