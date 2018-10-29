const {ObjectID} = require('mongodb');

const {mongoose} =  require('./../server/db/moongose');
const {Todo} =  require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.deleteMany({}).then(result => {
//     console.log(result);
// });
//Todo.findOneAndRemove //encuentra uno, lo borra y devuelve al usuario
//Todo.findByIdAndRemove //encuentra uno, lo borra y devuelve al usuario

// Todo.findOneAndRemove({_id: '5bd64ddb26cb2366212c8bf4'}).then((todo) => {

// });

Todo.findByIdAndRemove('5bd64ddb26cb2366212c8bf4').then((todo) => {
    console.log(todo);
});