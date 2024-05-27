/**
 * fetching data from the server
 */

import axios from "axios";


/** user-authentication */
const baseUrl = "http://localhost:8080/api";
const authenticate = async ({ username }) => {
  try {
    const user = await axios.post(`${baseUrl}/authenticate`, { username });
    console.log(user);
  } catch (err) {
    console.log("error", err);
  }
};

/** get user details */
const userDetails = async (username) => {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${username}`);
    //console.log(data);
    return data;
  } catch (err) {
    console.log("user Error", err);
  }
};

/** register user details */
const registerUser = async (userCredentials) => {
  try {
    const { username, email } = userCredentials;
    console.log(username);
    //send post request
    const {
      data: { message },
      status,
    } = await axios.post("http://localhost:8080/api/register", userCredentials);

    /** send email */
    if (status === 201) {
      await axios.post("http://localhost:8080/api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//if response is successful sent regsietr mail
//

export { authenticate, userDetails, registerUser };
