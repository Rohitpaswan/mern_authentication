import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Username = () => {
  const [submitting, setSubmitting] = useState(false);

  /** Validate username */
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = toast.error("Username is required");
    } else if (values.username.length < 3) {
      errors.username = toast.error("Username must be at least 3 characters");
    } else if (values.username !== values.username.toLowerCase()) {
      errors.username = toast.error("Username must be lowercase");
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // Set submitting state to true
      setSubmitting(true);

      // Perform any necessary actions with the form values
      console.log(values);

  
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex items-center justify-center h-screen border-sky-200">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src="user.png"
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                {...formik.getFieldProps("username")}
                placeholder="Username"
              />
             
              <button
                className={styles.btn}
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Let's Go"}
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
