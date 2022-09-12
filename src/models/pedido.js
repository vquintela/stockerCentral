var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var estadoPedido = {
    values: ["enviado", "preparación", "cancelado"],
    message: "{VALUE} no es un estado permitido ",
};

const detalleVenta = new Schema({
    id_producto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'producto'
    },
    cantidad: {
        type: Number,
        required: [true, '¡Campo Obligatorio!']
    },
    precio: {
        type: Number,
        required: [true, '¡Campo Obligatorio!']
    }
});

var ventaSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'usuario'
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    total_venta: {
        type: Number,
        min: [0, 'La venta no puede ser menor a cero']
    },
    forma_pago: {
        type: String,
        enum: {
            values: ['mercadopago', 'transferencia'],
            message: 'Debe elegir una forma de pago'
        }
    },
    detalle: {
        type: [ detalleVenta ]
    },
    status: {
        type: String,
        enum: {
            values: ['approved', 'in_process', 'rejected', 'efectivo']
        }
    }, 
    payment_id: {
        type: String
    },
    merchant_order_id: {
        type: String
    }
}, { collection: "venta" });

ventaSchema.plugin(uniqueValidator, { message: "debe ser único" });
module.exports = mongoose.model("venta", ventaSchema);