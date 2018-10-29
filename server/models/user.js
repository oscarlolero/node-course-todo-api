var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true,
        unique: true, //verifica que no se repite en otro documento de la coleccion, NECESITA UN DROP LA BASE DE DATOS
        validate: {
            validator: validator.isEmail, //regresa true si es valido y false si es invalido
            message: `{VALUE} is not a valid email`
        } 
    },
    password: {
        type: String,
        require: true,
        minlenght: 6
    },
    tokens: [{
        access: {
           type: String,
           required: true 
        },
        token: {
            type: String,
            required: true 
        }
    }]
});
UserSchema.methods.toJSON = function() {//override a funcion toJSON
    let userObject = this.toObject();//toma solo las propiedades que existen
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () { //se usa function porque necesitamos el this
    let access = 'auth';
    let token = jwt.sign({_id: this._id.toHexString(), access}, 'abc123').toString();

    this.tokens = this.tokens.concat([{access, token}]);//no se usa push por inconsistencias
    return this.save().then(() => {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);
// let newUser = User({
//     email: 'caca@ugto.mx'
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 3));
// }, (e) => {
//     console.log('Unable to save user', e);
// });

module.exports = { User };