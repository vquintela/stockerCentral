var nodemailer = require('nodemailer');
var express = require('express');
var app = express();

app.post('/', (req, res) => {
    var trasnporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "equipostocker2020@gmail.com",
            pass: "magoag2020!",
        },

    });

    var mailOptions = {
        from: "Remitente",
        to: "equipostocker2020@gmail.com",
        subject: "Se genero un nuevo registro en Stocker",
        text: "Se ha generado un nuevo usuario en la app, por favor verificar permisos",
    };
    trasnporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Enviado");
            res.status(200).jsonp(req.body);
        }

    })


});
module.exports = app;