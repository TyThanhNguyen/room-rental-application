const {User} = require('../models/user');

let authenticate = (req, res, next) => {
    console.log('okkkk')
    let token = req.header('x-auth');
    console.log('token: ', token);
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send(e);
    });
};

module.exports = {authenticate};