import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import cookieParser from "cookie-parser";
/** POST: http://localhost:8080/api/register 
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
    var token = jwt.sign({ email: email }, "shhhhh");
    res.cookie("token", token);
    console.log(token);
    res
      .status(201)
      .json({ message: "User created successfully", user: createUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
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

    const token = jwt.sign({ email: email }, "shhhhh", { expiresIn: "24h" });

    res.cookie("token", token, { httpOnly: true });
    res
      .status(200)
      .json({ success: true, message: "You have successfully logged in" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
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


/** GET: http://localhost:8080/api/updateuser?id=123455  */
export async function updateUser(req, res) {
  const id = req.query.id;
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
      return response.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Invalid userId" });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {}

/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {}
