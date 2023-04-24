/* Ruta: api/usuarios */
const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, reNewToken } = require("../controllers/auth");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [check("token", "El token de google es obligatorio").not().isEmpty()],
  googleSignIn
);

router.get("/renew", validarJWT, reNewToken);
module.exports = router;
