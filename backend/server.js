const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adultoMayorRoutes = require("./routes/adultoMayorRoutes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/adultos", adultoMayorRoutes);

// Conexión a MongoDB
mongoose
  .connect(
    "mongodb://admin:admin123@localhost:27017/ayuda_adulto_mayor?authSource=admin"
  )
  .then(() => {
    console.log("✅ MongoDB conectado correctamente");
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error);
  });

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Ayuda Mayor funcionando correctamente"
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});