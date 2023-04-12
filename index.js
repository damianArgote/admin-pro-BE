require("dotenv").config();
const express = require("express");

const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();
app.use(express.json());
app.use(cors());

dbConnection();

//rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT);
});
