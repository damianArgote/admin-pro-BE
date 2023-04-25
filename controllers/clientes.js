const { response } = require("express");
const Cliente = require("../models/cliente");

const getClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json({
    ok: true,
    clientes,
  });
};

const crearCliente = async (req, res = response) => {
  const uid = req.uid;
  const cliente = new Cliente({
    usuario: uid,
    ...req.body,
  });
  try {
    const nuevoCliente = await cliente.save();

    return res.json({
      ok: true,
      cliente: nuevoCliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const actualizarCliente = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const clienteDb = await Cliente.findById(id);

    if (!clienteDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un cliente con ese uid",
      });
    }

    const cambiosCliente = {
      ...req.body,
      usuario: uid,
    };

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      cambiosCliente,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      cliente: clienteActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const borrarCliente = async (req, res) => {
  const id = req.params.id;

  try {
    const clienteDb = await Cliente.findById(id);

    if (!clienteDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un cliente con ese uid",
      });
    }

    await Cliente.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: "Cliente borrado...",
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
  getClientes,
  crearCliente,
  actualizarCliente,
  borrarCliente,
};
