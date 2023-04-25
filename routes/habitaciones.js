/* Ruta: api/usuarios */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const {
  crearHabitacion,
  getHabitaciones,
  actualizarHabitacion,
  borrarHabitacion,
} = require("../controllers/habitaciones");

const router = Router();

router.get("/", validarJWT, getHabitaciones);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre de la habitacion es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHabitacion
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre de la habitacion es necesario").not().isEmpty(),
  ],
  actualizarHabitacion
);

router.delete("/:id", validarJWT, borrarHabitacion);

module.exports = router;
