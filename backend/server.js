
// Import required modules
import express from "express";
import bodyParser from "body-parser";

import router from "./src/routers/route.js";
import connectionDB from "./src/database/connectionDB.js";

// Create an Express application
const app = express();
const port = 3000; // Choose any port you like

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', router)



// Start the server
app.listen(port,async () => {
    await connectionDB()
    console.log(`Server is running on port ${port}`);
});
