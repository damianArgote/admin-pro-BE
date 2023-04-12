const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDb = await Usuario.findOne({ email });

    if (!usuarioDb) {
      return res.status(400).json({
        ok: false,
        msg: "Datos no validos",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDb.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Datos no validos",
      });
    }

    const token = await generarJWT(usuarioDb.id);
    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, hable con el administrador",
    });
  }
};

module.exports = { login };
