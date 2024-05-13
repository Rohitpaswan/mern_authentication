import { Router } from "express";
import { createResetSession, generateOTP, getUser, login, register, resetPassword, updateUser, verifyOTP } from "../controllers/user.controller.js";
import auth, { localVariable } from "../middleware/auth.js";

const router = new Router();


/** post methods */
router.post('/register', register);
router.post("/login", login);



// router.route("/registerMail").post();
// router.route("/authenticate").post();
// router.route("/login".post());


// /** Get method */
 router.route("/user/:username").get(getUser);
 router.route("/genrateOTP").get(localVariable , generateOTP);
 router.route("/verfyOTP").get(verifyOTP);
 router.route("/createRestSession").get(createResetSession);

// /**PUt Method */
 router.route("/updateuser").put( auth ,updateUser);
    router.route("/resetpassword").put(resetPassword);

export default router;