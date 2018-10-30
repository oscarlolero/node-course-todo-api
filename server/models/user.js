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
//a function declared on UserSchema.methods instead of UserSchema.statics, it means that thisin this function represents an individual user/document. In a function defined on UserSchema.statics, this would refer to the entire user collection.
UserSchema.statics.findByToken = function (token) {
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) =>{
        //     reject(); //para llamar el catch del server.js
        // });
        return Promise.reject('TOKEN INVALIDO O USUARIO NO ENCONTRADO'); //mas simple :v
    }

    return this.findOne({
        '_id': decoded._id, //para mantener consistencia nomas se pone entre comillas, aqui no es necesario
        'tokens.token': token,//para nested documents
        'tokens.access': 'auth'
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