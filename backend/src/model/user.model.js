import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: "String",
    required: [true, "Name is required"],
    unique: [true, "Usernam already  exists"],
    lowercase: [true, "only lower case characters are allowed"],
  },

  password: {
    type: "String",
    required: [true, "Password is required"],
  },
  email: {
    type: "String",
    required: [true, "Email is required"],
    
    unique: true,
  },
  firstName: {
    type: "String",
    required: [true, "First name is required"],
  },
  lastName: {
    type: "String",
    required: [true, "Last name is required"],
  },
  address:{
    type: "String",
  },
  profile: {
 type: "String",}
});

const userModel =  model('tester', userSchema);
export default userModel;