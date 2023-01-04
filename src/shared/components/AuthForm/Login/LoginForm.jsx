import { useFormik } from 'formik';
import React, { useRef } from 'react';
import * as yup from 'yup';
import s from '../Login/LoginForm.module.scss';
import { toast } from 'react-toastify';
import Container from '../../Container';
import { ReactComponent as GroupLogoIcon } from '../../../../assets/icons/groupLogo.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';
import { ReactComponent as GoogleIcon } from '../../../../assets/icons/google.svg';
import authSelectors from 'redux/Auth/SelectorAuth';
import authOperations from 'redux/Auth/OperationsAuth';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const validationSchema = yup.object({
    email: yup
        .string('Enter email')
        .min(5, 'Too Short!')
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string('Enter password')
        .min(6, 'Too Short!')
        .required('Password is required'), 
    
})

const LoginForm = () => {
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const isLoading = useSelector(authSelectors.getIsLoading);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => {
            buttonRef.current = 'login';
            dispatch(authOperations.login(values))
                .unwrap()
                .catch(error =>
                    toast.error(
                      (`Login is failed with message:`) + " " + error.message
                    )
                );
        },
    });
    return (
       <>
        <form onSubmit={formik.handleSubmit} className={s.auth_form}>
          <div className={s.auth_form_inner_logo}>
          <GroupLogoIcon className={s.auth_form_logo} />
          <h1 className={s.auth_form_title}>
            Wallet
          </h1>
          
         </div>
                <label className={s.auth_form_label}>
            <span className={s.auth_form_span}><EmailIcon />
                
                    <input
                        className={s.auth_form_input}
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="E-Mail"
                    
              />
              </span>
                    {/* <span className={s.auth_form_validation}>
                        {formik.errors.email}
                    </span> */}
                </label>
                <label className={s.auth_form_label}>
                    <span className={s.auth_form_span}><PasswordIcon/>
                  
                    <input
                        className={s.auth_form_input}
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Password"
                     
              />
              </span>
                    {/* <span className={s.auth_form_validation}>
                        {formik.errors.password}
                    </span> */}
                </label>
                <ul className={s.auth_form_inner_btn}>
                    <li className={s.item}>
                        <button 
                            className={s.auth_form_btn_login}
                            isLoading={
                                isLoading && buttonRef.current === 'login'
                            }
                            type="submit"
                        >
                            Log in
                        </button>
                    </li>
                    <li className={s.item}>
                        <Link to="/register"
                            className={s.auth_form_btn_register}
                        >
                            Register
                        </Link>
                    </li>
                 </ul>
                   <a
                    href="https://wallet-api-kaqj.onrender.com/auth/google"
                    className={s.auth_form_google_button}
                    aria-label="google button"
                >
                    <GoogleIcon className={s.auth_form_icon_google} />
                    Google
                </a>
                </form>
                </>
    );
};


export default LoginForm;