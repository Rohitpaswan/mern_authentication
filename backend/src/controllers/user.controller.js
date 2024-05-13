import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generation";
import userModel from "../model/user.model.js";
import {jwtKey} from "../../secret.js"
/** POST: http://localshost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req, res) {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    

    // Validation
    const missingFields = checkRequiredFields({
      username,
      password,
      email,
      firstName,
      lastName,
    });
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Missing required fields", missingFields });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Password Hashing
    const hash = await bcrypt.hash(password, 10);

    // Store hash in your password DB
    const createUser = await userModel.create({
      username,
      password: hash,
      email,
      firstName,
      lastName,
    });
    const token = jwt.sign(
      { userId: createUser.id, username: username },
     jwtKey
    );
    console.log(jwtKey , token);
    res.cookie("token", token);
   
    res
      .status(201)
      .json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

/** validation of input fields */
function checkRequiredFields(fields) {
  const requiredFields = [
    "username",
    "password",
    "email",
    "firstName",
    "lastName",
  ];
  return requiredFields.filter((field) => !fields[field]);
}

/** POST: http://localshost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, username: username }, "jwtKey", {
      expiresIn: "24h",
    });

    res.cookie("token", token, { httpOnly: true });
    res
      .status(200)
      .json({ success: true, message: "You have successfully logged in" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/** GET: http://localshost:8080/api/user/example123 */
export async function getUser(req, res) {
  try {
    console.log("user");
    const { username } = req.params; // Extracting the username from req.params
    if (!username) {
      return res.status(404).json("Invalid username");
    }
    console.log(typeof username);
    const option = { password: 0 }; // remove password from response

    const userExist = await userModel.findOne({ username }, option);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "success", userExist });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

/** PUT: http://localshost:8080/api/updateuser?id=123455  */
export async function updateUser(req, res) {
  //const id = req.query.id;
  const id = req.user.userId;
  if (id) {
    try {
      const userdata = req.body;
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: id }, //filter : Find the user by their id
        userdata, // Data to be update
        { new: true } // Options: Return the updated document
      );
      return res.status(200).json({ message: "success", user: updatedUser });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Invalid userId" });
  }
}

/** GET: http://localshost:8080/api/generateOTP */
export function generateOTP(req, res) {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  req.app.locals.OTP = OTP;
  return res.status(201).json({ code: req.app.locals.OTP });
}

/** GET: http://localshost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { otp } = req.query; //get opt-code from user

  if (req.app.locals === undefined) {
    return res.status(402).json({ message: "OTP is expired" });
  }

  if (parseInt(req.app.locals.OTP) === parseInt(otp)) {
    req.app.locals.OTP = null; //reset the otp
    req.app.locals.resetSession = true; // start the session for the reset password
    return res.send("User verified");
  }

  return res.status(400).json({ message: "Invalid OTP" });
}

/** GET: http://localshost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //allow access this route only once
    return res.status(440).send( {error : "Session Expried" });
  }
 
}

/** PUT: http://localshost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
   
    if(!req.app.locals.resetSession) return res.status(404).send( {error : "Session Expried" });
    const { username, password } = req.body;
    if(!username || !password) return res.status(401).send( {error : "Invalid username or password" });
    const user = await userModel.findOne({username:username});
    if (!user) return res.status(403).send({ error: "User not found!" });
    else {
      // Password Hashing
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      await user.save(); // Save the updated user
      req.app.locals.resetSession = false; // reset session
      return res
        .status(200)
        .json({ message: "Password updated successfully"});

    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
