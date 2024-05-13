import dotenv from "dotenv";
dotenv.config({path: './config.env'})
const port = process.env.PORT;
const mongoDBUrl = process.env.MONGODB_URI
const jwtKey = process.env.JWTKEY
const smptUsername = process.env.SMPT_USERNAME
const smptPassword = process.env.SMPT_PASSWORD
//console.log(port , mongoDBUrl);

/** exporting port and mongodbUrl */
export   { port, mongoDBUrl,jwtKey, smptUsername,smptPassword } ;
