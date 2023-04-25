const { Schema, model } = require("mongoose");

const ClienteSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
  },
  { collection: "clientes" }
);

ClienteSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Cliente", ClienteSchema);
