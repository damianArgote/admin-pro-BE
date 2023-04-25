const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const {
  getClientes,
  actualizarCliente,
  borrarCliente,
  crearCliente,
} = require("../controllers/clientes");

const router = Router();

router.get("/", validarJWT, getClientes);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del cliente es necesario").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearCliente
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del cliente es necesario").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  actualizarCliente
);

router.delete("/:id", validarJWT, borrarCliente);

module.exports = router;
