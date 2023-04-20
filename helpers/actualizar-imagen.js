const fs = require("fs");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const borrarImagenExistente = (path) => {
  if (fs.existsSync(path)) {
    //Borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const acctualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }
      const pathUsuario = `./uploads/usuarios/${usuario.img}`;
      borrarImagenExistente(pathUsuario);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      const pathHospital = `./uploads/hospitales/${hospital.img}`;
      borrarImagenExistente(pathHospital);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;

    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }
      const pathMedico = `./uploads/medicos/${medico.img}`;
      borrarImagenExistente(pathMedico);

      medico.img = nombreArchivo;
      await medico.save();
      return true;

    default:
      break;
  }
};

module.exports = {
  acctualizarImagen,
};
