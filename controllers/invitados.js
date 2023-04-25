const { response } = require("express");
const Invitado = require("../models/invitado");

const getInvitados = async (req, res) => {
  const invitados = await Invitado.find().populate("cliente", "nombre email");
  res.json({
    ok: true,
    invitados,
  });
};

const crearInvitado = async (req, res = response) => {
  const uid = req.uid;
  const invitado = new Invitado({
    usuario: uid,
    ...req.body,
  });

  try {
    const nuevoInvitado = await invitado.save();

    return res.json({
      ok: true,
      invitado: nuevoInvitado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarInvitado = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const invitadoDb = await Invitado.findById(id);

    if (!invitadoDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un invitado con ese uid",
      });
    }

    const cambiosInvitado = {
      ...req.body,
      usuario: uid,
    };

    const invitadoActualizado = await Invitado.findByIdAndUpdate(
      id,
      cambiosInvitado,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      invitado: invitadoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarInvitado = async (req, res) => {
  const id = req.params.id;

  try {
    const invitadoDb = await Invitado.findById(id);

    if (!invitadoDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un invitado con ese uid",
      });
    }

    await Invitado.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: "Invitado borrado...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getInvitados,
  actualizarInvitado,
  borrarInvitado,
  crearInvitado,
};
