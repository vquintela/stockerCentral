// requires
var express = require('express');
var app = express();
//Módulo para encriptar contraseña
var bcrypt = require('bcryptjs');
//jwt
var jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario');
// constantes
var SEED = require('../config/config').SEED;

//metodo para logearse donde valida mail (user) y pass. trae token cada vez que se envia.
app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales invalidas - email',
                errors: err
            });

        }
        if (!body.password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error request',
                errors: err
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales invalidas - password',
                errors: err
            })
        }
        usuarioDB.password = '=)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }) //4hs

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    });
});
module.exports = app;