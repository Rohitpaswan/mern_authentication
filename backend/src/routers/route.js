import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
//import { register } from "../controllers/user.controller.js"
const router = new Router();


/** post methods */
router.post('/register', register);
router.post("/login", login);



// router.route("/registerMail").post();
// router.route("/authenticate").post();
// router.route("/login".post());


// /** Get method */
// router.route("/user/:username").get();
// router.route("/genrateOTP").get();
// router.route("/verfyOTP").get();
// router.route("/createRestSession").get();

// /**PUt Method */
// router.route("/updateuser").put();
// router.route("/resetpassword").put();

export default router;