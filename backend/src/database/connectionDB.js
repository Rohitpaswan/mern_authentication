import mongoose from "mongoose";
import { mongoDBUrl } from "../../secret.js";


const connectionDB = async () => {
  const dbName = 'userAuth'; // Corrected the variable name
 
  try {
    const db = await mongoose.connect(`${mongoDBUrl}/${dbName}`);
    console.log("Database Connected");
    return db;
  } catch (err) {
    console.error(err);
  }
};

export default connectionDB;
