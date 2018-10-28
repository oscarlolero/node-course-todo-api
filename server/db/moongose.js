let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //para poder manejar promises
//'mongodb://127.0.0.1:27017/TodoApp'
mongoose.connect('mongodb://oscarlolero:oscar6932124@ds050077.mlab.com:50077/oscarlolero-todo-app', {
    useNewUrlParser: true
});


module.exports = {
    mongoose
};