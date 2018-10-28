var mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true //eliminar espacios en blancos al final y al principio
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//agregando "validators", "schemas"
// let newTodo2 = new Todo({
//     text: 'Something to do'
// });

// newTodo2.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 3));
// }, (e) =>{
//     console.log('Unable to save todo2', e);
// });

//User model
//property: email - require it - trim it - settype string- set min lenght of 1
module.exports = { Todo };