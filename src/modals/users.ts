import { Schema, models, model } from "mongoose";

const usersSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
  },
  mobile: {
    type: Number,
    required: [true, "mobile is required"],
  },
  personaladdress: {
    type: String,
    required: [true, "personaladdress is required"],
  },
  streetaddress: {
    type: String,
    required: [true, "streetaddress is required"],
  },
  country: {
    type: String,
    required: [true, "country is required"],
  },
  state: {
    type: String,
    required: [true, "state is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  pin: {
    type: Number,
    required: [true, "pincode is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const Users = models.users || model("users", usersSchema);

export default Users;
