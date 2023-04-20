const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { acctualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo no valido",
    });
  }
  //validar si existe archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }
  //procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  //Validar extensiones
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension valida",
    });
  }
  //generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  //crear path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  //Mover la imagen
  file.mv(path, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //Actualizar Db
    await acctualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo subido ",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const imagen = req.params.imagen;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const noImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(noImg);
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
};
