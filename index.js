require("dotenv").config();
const express = require("express");

const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

dbConnection();

//rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));

app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/habitaciones", require("./routes/habitaciones"));
app.use("/api/invitados", require("./routes/invitados"));

app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require("./routes/uploads"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT);
});
