let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //para poder manejar promises
console.log(process.env.PORT);
mongoose.connect(!process.env.PORT ? 
    'mongodb://oscarlolero:oscar6932124@ds050077.mlab.com:50077/oscarlolero-todo-app' 
    : 
    'mongodb://127.0.0.1:27017/TodoApp', {
    useNewUrlParser: true
});

module.exports = {
    mongoose
};