import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster }  from "react-hot-toast";
const Password = () => {
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
    validate : validatePassword,
   validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false); // Manually set submitting to false
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster/>
      <div className="flex items-center justify-center  h-screen border-sky-200">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src="user.png" className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="password"
                {...formik.getFieldProps("password")}
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
              
              Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
              Forget Password?
                <Link className="text-red-500" to="/recovery">
              Recovery Now 
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
