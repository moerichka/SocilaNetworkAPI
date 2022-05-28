const { Schema, model } = require("mongoose");

const TestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    questions: {
      type: Array,
    },
    results: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        answers: { type: Array },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Test", TestSchema);
