let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //para poder manejar promises
//PARA USAR DB SOLO PARA PRUEBAS Y OTRO PARA LOCAL
mongoose.connect(!process.env.PORT ? 
    'mongodb://127.0.0.1:27017/TodoApp'
    : 
    'mongodb://oscarlolero:oscar6932124@ds050077.mlab.com:50077/oscarlolero-todo-app' , {
    useNewUrlParser: true
});

module.exports = {
    mongoose
};