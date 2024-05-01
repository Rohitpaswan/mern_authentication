import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useState } from "react";
const Register = () => {
  const[file, setfile] = useState();
  /** Valiadte Password */
  const validatePassword = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = toast.error("Password is required");
    } else if (values.password.length < 5) {
      errors.password = toast.error("Password must be at least 5 characters");
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async values =>{
      values = Object.assign(values, { profile: file || '' })
    }
  });

/**function for convert img to 64base */
const convertToBase64 = (file) =>{
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
        reject(error)
    }
})
}

  /** formik doesnt support file upload */
  const onUpload = async(e) =>{
    const base64=await convertToBase64(e.target.files[0]);
    setfile(base64)
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center  h-screen border-sky-200">
        <div className={styles.glass}  style={{ width: "35%", height: "90%", paddingTop: '3em'}}>
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
              <input type="file" id="profile" name="profile" onChange={onUpload}/>
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
