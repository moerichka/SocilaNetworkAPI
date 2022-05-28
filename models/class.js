const { Schema, model } = require("mongoose");

const ClassSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      max: 15,
    },
    letter: {
      type: String,
      max: 3,
    },
    pupils: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Class", ClassSchema);
