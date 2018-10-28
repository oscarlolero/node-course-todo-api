const {ObjectID} = require('mongodb');

const {mongoose} =  require('./../server/db/moongose');
const {Todo} =  require('./../server/models/todo');
const {User} = require('./../server/models/user')

// let id = '5bd610d71fe9df0b28bf084dd';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id //lo convierte solito :o
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id //lo convierte solito :o
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found!');
//     }
//     console.log('Todo by id', todo);
// }).catch((e)=> {//invalid object id
//     //console.log(e);
// });

//User.findById
User.findById('5bd287fb941d170fac415fdb').then((user) => {
    if(!user) {
        return console.log('User not found!');
    }

    console.log('User by id', JSON.stringify(user, undefined, 3), typeof(user));
}, (e) => {
    console.log(e);
});
