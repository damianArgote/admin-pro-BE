const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");
  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });
  try {
    const nuevoMedico = await medico.save();

    return res.json({
      ok: true,
      medico: nuevoMedico,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const actualizarMedico = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medicoDb = await Medico.findById(id);

    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un medico con ese uid",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const borrarMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medicoDb = await Medico.findById(id);

    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un medico con ese uid",
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: "Medico borrado...",
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
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
