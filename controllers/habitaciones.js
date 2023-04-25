const { response } = require("express");
const Habitacion = require("../models/habitacion");

const getHabitaciones = async (req, res) => {
  const habitaciones = await Habitacion.find().populate(
    "cliente",
    "nombre email"
  );
  res.json({
    ok: true,
    habitaciones,
  });
};

const crearHabitacion = async (req, res = response) => {
  const uid = req.uid;
  const habitacion = new Habitacion({
    usuario: uid,
    ...req.body,
  });

  try {
    const nuevoHabitacion = await habitacion.save();

    return res.json({
      ok: true,
      habitacion: nuevoHabitacion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHabitacion = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const habitacionDb = await Habitacion.findById(id);

    if (!habitacionDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una habitacion con ese uid",
      });
    }

    const cambiosHabitacion = {
      ...req.body,
      usuario: uid,
    };

    const habitacionActualizado = await Habitacion.findByIdAndUpdate(
      id,
      cambiosHabitacion,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      habitacion: habitacionActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarHabitacion = async (req, res) => {
  const id = req.params.id;

  try {
    const habitacionDb = await Habitacion.findById(id);

    if (!habitacionDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una habitacion con ese uid",
      });
    }

    await Habitacion.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: "Habitacion borrada...",
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
  getHabitaciones,
  actualizarHabitacion,
  borrarHabitacion,
  crearHabitacion,
};
