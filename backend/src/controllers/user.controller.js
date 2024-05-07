import userModel from "../model/user.model.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
    return res.status(404).send({ error: "Authentication Error" });
}

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
    const userInfo = req.body;
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ error: "All required fields must be provided" });
    }

    try {
        const userExists = await userModel.exists({ email: email });
        if (userExists) {
            return res.status(409).json("User already exists");
        } else {
            // Save data 
            const user = new userModel(userInfo); // No need to wrap userInfo in curly braces
            await user.save();
            // Respond with success message
            return res.status(201).json("User registered successfully");
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
















/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/


export async function login(req, res) {

}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {

}


export async function updateUser(req, res) {

}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {

}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {

}

/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {

}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {

}


