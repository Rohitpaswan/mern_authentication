
// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./src/routers/route.js";
import connectionDB from "./src/database/connectionDB.js";
import userModel from "./src/model/user.model.js";

// Create an Express application
const app = express();
const port = 3000; // Choose any port you like

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', router)


app.post('/', async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username) {
        return res.status(400).send("Username is required");
    }

    try {
        const u = await userModel.create({ username, email, password, firstName, lastName });
        res.send(u);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Start the server
app.listen(port,async () => {
    await connectionDB()
    console.log(`Server is running on port ${port}`);
});
