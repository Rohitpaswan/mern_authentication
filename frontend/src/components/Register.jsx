import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";

import { useState } from "react";
import { validateRegister } from "../helper/validate";
import  { Toaster } from "react-hot-toast";
const Register = () => {
  const [file, setfile] = useState();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  /**function for convert img to 64base */
  const convertToBase64 = async (file) => {
    try {
      const fileReader = new FileReader();

      const base64 = await new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      return base64;
    } catch (error) {
      throw new Error("Failed to convert file to Base64: " + error.message);
    }
  };

  /** formik doesnt support file upload */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setfile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster/>
      <div className="flex items-center justify-center  h-screen border-sky-200">
        <div
          className={styles.glass}
          style={{ width: "35%", height: "90%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center ">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || "../user.png"}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-4">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
