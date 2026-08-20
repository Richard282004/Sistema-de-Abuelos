const mongoose = require("mongoose");

const adultoMayorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    apellido: {
      type: String,
      required: true,
      trim: true
    },

    rut: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    edad: {
      type: Number,
      required: true,
      min: 60
    },

    telefono: {
      type: String,
      required: true
    },

    direccion: {
      type: String,
      required: true
    },

    comuna: {
      type: String,
      required: true
    },

    necesidades: {
      type: [String],
      default: []
    },

    contactoEmergencia: {
      nombre: {
        type: String
      },

      telefono: {
        type: String
      },

      parentesco: {
        type: String
      }
    },

    restriccionesContacto: {
      type: String,
      default: ""
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "AdultoMayor",
  adultoMayorSchema
);