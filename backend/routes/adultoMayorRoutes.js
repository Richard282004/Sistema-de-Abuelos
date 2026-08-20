const express = require("express");
const router = express.Router();

const AdultoMayor = require("../models/AdultoMayor");

// GET - obtener todos
router.get("/", async (req, res) => {
  try {
    const adultos = await AdultoMayor.find().sort({ createdAt: -1 });

    res.json(adultos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener adultos mayores"
    });
  }
});


// POST - registrar adulto mayor
router.post("/", async (req, res) => {
  try {
    const nuevoAdulto = new AdultoMayor(req.body);

    const adultoGuardado = await nuevoAdulto.save();

    res.status(201).json(adultoGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al registrar adulto mayor",
      error: error.message
    });
  }
});


// GET - obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const adulto = await AdultoMayor.findById(req.params.id);

    if (!adulto) {
      return res.status(404).json({
        mensaje: "Adulto mayor no encontrado"
      });
    }

    res.json(adulto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar adulto mayor"
    });
  }
});


// PUT - actualizar
router.put("/:id", async (req, res) => {
  try {
    const adultoActualizado = await AdultoMayor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!adultoActualizado) {
      return res.status(404).json({
        mensaje: "Adulto mayor no encontrado"
      });
    }

    res.json(adultoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar adulto mayor",
      error: error.message
    });
  }
});


// DELETE - eliminar
router.delete("/:id", async (req, res) => {
  try {
    const adultoEliminado = await AdultoMayor.findByIdAndDelete(
      req.params.id
    );

    if (!adultoEliminado) {
      return res.status(404).json({
        mensaje: "Adulto mayor no encontrado"
      });
    }

    res.json({
      mensaje: "Adulto mayor eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar adulto mayor"
    });
  }
});

module.exports = router;