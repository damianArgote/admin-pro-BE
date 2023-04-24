const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDb = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDb) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@",
        img: picture,
        google: true,
      });
    } else {
      usuario = usuarioDb;
      usuario.google = true;
    }

    await usuario.save();

    const token = await generarJWT(usuario.id);

    return res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Token de google no valido",
    });
  }
};

module.exports = { login, googleSignIn };
