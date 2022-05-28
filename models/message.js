const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    conversationId:{
        type: Schema.Types.ObjectId
    },
    sender:{
        type: Schema.Types.ObjectId
    },
    text:{
        type: String
    }
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);