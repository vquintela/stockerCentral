//json web token
var jwt = require("jsonwebtoken");

//requiere modelo
var Usuario = require("../models/usuario");

//middleware
var mdAutenticacion = require("../middlewares/autenticacion");

// falta encriptar contraseña.
var bcrypt = require("bcryptjs");

const getUsuarios = (req, res) => {
    // enumerando
    var desde = req.query.desde || 0;
    // busca y mapea los atributos marcados
    Usuario.find({},
            "nombre apellido empresa email img role password cuit dni direccion telefono usuario")
        .skip(desde)
        .limit(15)

    // ejecuta, puede tener un error manejado.
    .exec((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando usuarios",
                errors: err,
            });
        }
        // metodo count donde va contando usuarios simplemente muestra un int que se incrementa con cada nuevo registro
        Usuario.count({}, (err, conteo) => {
            res.status(200).json({
                ok: true,
                usuarios: usuarios,
                total: conteo,
            });
        });
    });
}

const addUsuarios = (req, res) => {
 // seteo el body que viaja en el request. Todos los campos required del modelo deben estar aca si no falla
    // esto se setea en postman. Al hacer la peticion post en el body tipo x-www-form-urlencoded.
    var body = req.body;
    Usuario.find({})
        .exec((err, usuarios) => {

            if (usuarios.length == 0) {

                var usuario = new Usuario({
                    nombre: body.nombre,
                    apellido: body.apellido,
                    empresa: body.empresa,
                    img: body.img,
                    direccion: body.direccion,
                    cuit: body.cuit,
                    dni: body.dni,
                    telefono: body.telefono,
                    role: "ADMIN_ROLE",
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    usuario: body.email,
                });
            } else {
                var usuario = new Usuario({
                    nombre: body.nombre,
                    apellido: body.apellido,
                    empresa: body.empresa,
                    img: body.img,
                    direccion: body.direccion,
                    cuit: body.cuit,
                    dni: body.dni,
                    telefono: body.telefono,
                    role: "USER_ROLE",
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    usuario: body.email,
                });
            }
            // si se mando el request correcto se guarda. Este metodo puede traer un error manejado.

            usuario.save((err, usuarioGuardado) => {
                // si hay un error....
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "Error al crear usuario",
                        errors: err,
                    });
                }
                // si pasa ok ...
                res.status(201).json({
                    ok: true,
                    usuario: usuarioGuardado,
                    usuarioToken: req.usuario,
                });
            });
        });
}

module.exports = { getUsuarios, addUsuarios }