const express = require("express");
const router = express.Router();

const controlador = require('../controllers/controlador');

router.get("/",controlador.alba);
router.get("/:id",controlador.canciones);
router.get("/detalles/:id",controlador.detalles);
router.post("/actualizar",controlador.actualizar);
router.get("/editar/:id",controlador.editar);




module.exports = router;