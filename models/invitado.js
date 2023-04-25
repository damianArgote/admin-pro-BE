const { Schema, model } = require("mongoose");

const InvitadoSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },

    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
  },
  { collection: "invitados" }
);

InvitadoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Invitado", InvitadoSchema);
