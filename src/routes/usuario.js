//requires
var express = require("express");
var app = express();

// //json web token
var jwt = require("jsonwebtoken");

//requiere modelo
var Usuario = require("../models/usuario");

//middleware
var mdAutenticacion = require("../middlewares/autenticacion");

// falta encriptar contraseña.
var bcrypt = require("bcryptjs");

const { getUsuarios, addUsuarios } = require('../controller/usuario');

app.get("/", getUsuarios);

app.post("/", addUsuarios);

app.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario",
                errors: err,
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "El usuario con el ID" + id + " no existe",
                errors: { message: " No existe un usuario con ese ID" },
            });
        }
        usuario.nombre = body.nombre;
        usuario.apellido = body.apellido;
        usuario.empresa = body.empresa;
        usuario.email = body.email;
        usuario.direccion = body.direccion;
        usuario.dni = body.dni;
        usuario.cuit = body.cuit;
        usuario.telefono = body.telefono;
        usuario.role = body.role;
        usuario.password = usuario.password;
        usuario.usuario = body.email;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al actualizar usuario",
                    errors: err,
                });
            }
            usuarioGuardado.password = bcrypt.hashSync(body.password, 10);
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
            });
        });
    });
});

app.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al borrar usuario",
                errors: err,
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: "No existe un usuario con este ID",
                errors: { message: "No existe un usuario con este ID" },
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado,
        });
    });
});

//exportando modulo
module.exports = app;