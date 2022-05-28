const {Schema, model} = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 20
    },
    surname: {
      type: String,
      required: true,
      min: 2,
      max: 20
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    age: {
      type: Number,
      max: 3
    },
    interests: [{
      type: String,
      max: 15
    }],
    usertype: {
      type: String,
      // required: true,
      enum: ["pupils", "parent", "teacher", "psychologist"]
    },
    pupils: {
      school: {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
      class: {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
      parents: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }]
    },
    parent: {
      school: {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
      class: {},
      children: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
      otherParants: {}
    },
    teacher: {
      school: {
        type: Schema.Types.ObjectId,
        ref: "School",
      },

    },
    psychologist: {
      
    }
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
