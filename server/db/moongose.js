let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //para poder manejar promises
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
});

module.exports = {
    mongoose
};