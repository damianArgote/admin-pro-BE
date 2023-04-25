const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },

    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
    capacidad: {
      type: Number,
      require: true,
    },
    disponible: {
      type: Boolean,
      require: true,
    },
    checkin: {
      type: Date,
    },
    checkout: {
      type: Date,
    },
  },
  { collection: "habitaciones" }
);

HabitacionSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Habitacion", HabitacionSchema);
