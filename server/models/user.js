var mongoose = require('mongoose');
let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    }
});
// let newUser = User({
//     email: 'caca@ugto.mx'
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 3));
// }, (e) => {
//     console.log('Unable to save user', e);
// });

module.exports = { User };