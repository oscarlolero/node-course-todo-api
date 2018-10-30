let {User} = require('./../models/user');
//para no repetir el codigo de verificar el x-auth, se crea un middlewere
let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    User.findByToken(token).then(user => {
        if(!user) {
            return Promise.reject();
        }
        //modificar el req del usuario
        req.user = user;
        req.token = token;//para poder usarlo abajo
        next(); //para que todos los que llevan el middleware "authenticate" ahora si puedan ejecutarse
    }).catch((e) => {
        res.status(401).send(e);//401 auth is required!
    });
};

module.exports = {authenticate};