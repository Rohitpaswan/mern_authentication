/**
 * user data validation
 */

import toast from "react-hot-toast";

/** validate register from */
export function validateRegister(values) {
  console.log(values);
  const errors = {};
  //username verification
   usernameVerify(values, errors);

  //email
  validateEmail(values, errors);

  //password verification
  validatePassword(values, errors);


}

/** validate username */
export function usernameVerify(values, errors = {}) {
  if (!values.username) {
    errors.username = toast.error("Username is required");
  } else if (values.username.length < 3) {
    errors.username = toast.error("Username must be at least 3 characters");
  } else if (values.username !== values.username.toLowerCase()) {
    errors.username = toast.error("Username must be lowercase");
  }
  return errors;
}

/** validaye email-id */
function validateEmail(values, errors = {}) {
  if (!values.email) {
    errors.password = toast.error("Email is required");
  }
  return errors;
}

/** Valiadte Password */
export function validatePassword(values, errors = {}) {
  if (!values.password) {
    errors.password = toast.error("Password is required");
  } else if (values.password.length < 5) {
    errors.password = toast.error("Password must be at least 5 characters");
  }
  return errors;
}


