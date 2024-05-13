import jwt from "jsonwebtoken";
import { jwtKey } from "../../secret.js";

export default async function auth(req, res, next) {
  try {
    //access authorize header for to validate req
    const token = req.headers.authorization.split(" ")[1];

    //retrieve user data
    const decode = jwt.verify(token, jwtKey);
    req.user = decode; // Pass userID to the request object
    next();
  } catch (err) {
    res.status(401).json("Authorization failed!!");
  }
}

//middeleware for storing local variables
export function localVariable(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
