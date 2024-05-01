
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster }  from "react-hot-toast";
const Password = () => {
  /** Valiadte Password */
  const resetPasswordValidation = async(values) => {
 
    const errors ={};
    if(values.password !== values.confirm_pwd){
      errors.exist = toast.error("Password not match...!");
  }

  return errors;
  };
  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd: ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : resetPasswordValidation,
  })

  return (
    <div className="container mx-auto">
      <Toaster/>
      <div className="flex items-center justify-center  h-screen border-sky-200">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
            Enter new password.
            </span>
          </div>
          <form className='py-20' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat Password' />
                  <button className={styles.btn} type='submit'>Reset</button>
              </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
