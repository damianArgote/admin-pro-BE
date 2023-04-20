const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middleware/validar-jwt");
const { fileUpload, retornaImagen } = require("../controllers/upload");

const router = Router();
router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);
router.get("/:tipo/:imagen", validarJWT, retornaImagen);

module.exports = router;
