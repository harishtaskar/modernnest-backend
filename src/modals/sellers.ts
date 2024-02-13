import { Schema, models, model } from "mongoose";

const sellerSchema = new Schema({
  personal: {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    mobile: {
      type: String,
      required: [true, "personalmobile is required"],
    },
    email: {
      type: String,
      required: [true, "personalemail is required"],
    },
  },
  business: {
    name: {
      type: String,
      required: [true, "businessname is required"],
    },
    registration: {
      type: String,
      required: [true, "registrationnumber is required"],
    },
    taxid: {
      type: String,
      required: [true, "taxid is required"],
    },
    contact: {
      type: String,
      required: [true, "businesscontact is required"],
    },
    email: {
      type: String,
      required: [true, "businessemail is required"],
    },
    document: {
      name: { type: String, required: [true, "businessdocument is required"] },
      path: { type: String, required: [true, "businessdocument is required"] },
      type: { type: String, required: [true, "businessdocument is required"] },
    },
  },
  store: {
    name: {
      type: String,
      required: [true, "storename is required"],
    },
    description: {
      type: String,
      required: [true, "storedescription is required"],
    },
    logo: {
      name: { type: String, required: [true, "logo is required"] },
      path: { type: String, required: [true, "logo is required"] },
      type: { type: String, required: [true, "logo is required"] },
    },
    shiping: {
      type: String,
      required: [true, "shiping is required"],
    },
    estimatedeliverytime: {
      type: String,
      required: [true, "estimatedeliverytime is required"],
    },
    shipingrates: {
      type: String,
    },
  },
  address: {
    personaladdress: {
      type: String,
      required: [true, "storedescription is required"],
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
      type: String,
      required: [true, "pin is required"],
    },
  },
  idverification: {
    name: { type: String, required: [true, "idverification is required"] },
    path: { type: String, required: [true, "idverification is required"] },
    type: { type: String, required: [true, "idverification is required"] },
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  confirmpassword: {
    type: String,
  },
});

const Seller = models.sellers || model("sellers", sellerSchema);

export default Seller;
