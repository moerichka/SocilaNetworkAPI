const { Schema, model } = require("mongoose");

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 30,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Class"
    }]
  },
  { timestamps: true }
);

module.exports = model("School", SchoolSchema);
