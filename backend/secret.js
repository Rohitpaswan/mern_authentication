import dotenv from "dotenv";
dotenv.config({path: './config.env'})
const port = process.env.PORT;
const mongoDBUrl = process.env.MONGODB_URI
const jwtKey = process.env.JWTKEY
//console.log(port , mongoDBUrl);

/** exporting port and mongodbUrl */
export   { port, mongoDBUrl,jwtKey } ;
