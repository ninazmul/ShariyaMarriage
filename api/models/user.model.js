import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/NjvDZcY/user-7993222.png",
    },
    number: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: null,
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    PermanentDivision: {
      type: String,
      default: "",
    },
    PresentDivision: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    birth: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    race: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    father: {
      type: String,
      default: "",
    },
    mother: {
      type: String,
      default: "",
    },
    expectedAge: {
      type: String,
      default: "",
    },
    expectedHeight: {
      type: String,
      default: "",
    },
    expectedWeight: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
