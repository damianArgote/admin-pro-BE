const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const nuevoHospital = await hospital.save();

    return res.json({
      ok: true,
      hospital: nuevoHospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHospital = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospitalDb = await Hospital.findById(id);

    if (!hospitalDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital con ese uid",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospitalDb = await Hospital.findById(id);

    if (!hospitalDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital con ese uid",
      });
    }

    await Hospital.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: "Hospital borrado...",
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
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
