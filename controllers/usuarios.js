const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments(),
  ]);
  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password, nombre } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id);

    return res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese uid",
      });
    }

    const { password, google, email, ...campos } = req.body;

    if (usuarioDb.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El email ya esta registrado",
        });
      }
    }

    if (!usuarioDb.google) {
      campos.email = email;
    } else if (usuarioDb.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuarios de google no pueden cambiar su email",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    return res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese uid",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    return res.json({
      ok: true,
      msg: "Usuario borrado...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
