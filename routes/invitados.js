/* Ruta: api/usuarios */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const {
  crearInvitado,
  getInvitados,
  actualizarInvitado,
  borrarInvitado,
} = require("../controllers/invitados");

const router = Router();

router.get("/", validarJWT, getInvitados);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del invitado es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearInvitado
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del invitado es necesario").not().isEmpty(),
  ],
  actualizarInvitado
);

router.delete("/:id", validarJWT, borrarInvitado);

module.exports = router;
