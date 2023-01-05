import { useFormik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import s from '../Register/RegisterForm.module.scss';
import { toast } from 'react-toastify';
import Container from '../../Container';
import { ReactComponent as GroupLogoIcon } from '../../../../assets/icons/groupLogo.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';
import { ReactComponent as NameIcon } from '../../../../assets/icons/name.svg';
import { ReactComponent as GoogleIcon } from '../../../../assets/icons/google.svg';
import authSelectors from 'redux/Auth/SelectorAuth';
import authOperations from 'redux/Auth/OperationsAuth';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



// const validationSchema = yup.object({
//     email: yup
//         .string('Enter email')
//         .min(5, 'Too Short!')
//         .max(12,'To Long!')
//         .email('Invalid email')
//         .required('Email is required'),
//     password: yup
//         .string('Enter password')
//         .min(6, 'Too Short!')
//         .max(12,'To Long!')
//         .required('Password is required'),
//         // .confirm('Entered passwords do not match'),
//     // confirmPassword: yup
//     //     .string('Enter password')
//     //     .min(6, 'Too Short!')
//     //     .max(12,'To Long!')
//     // .required('Password is required'),
//   confirm_password: yup
//     .string()
//     .placeholder('Confirm password')
//     .required()
//     .oneOf([yup.ref('password'), null], 'Passwords must match'),
//     name: yup
//         .string('Enter your first name')
//         .min(1, 'Too Short!')
//         .max(12,'To Long!')
//         .required('First name is required'),

// })

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  name: Yup.string().required(),
  phone: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});
  // confirmPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),

const protectionLine = (password) => {
  const passLength = password.length;
  if (passLength >= 1 && passLength < 7) {
    return s.lowProtection;
  }
  if (passLength >= 7 && passLength < 10) {
    return s.middleProtection;
  }
  if (passLength >= 10) {
    return s.strongProtection;
  }
  return s.protection;
}

const RegisterForm = () => {
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const isLoading = useSelector(authSelectors.getIsLoading);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name:'',
        },
        validationSchema,
        onSubmit: values => {
            buttonRef.current = 'login';
            dispatch(authOperations.login(values))
                .unwrap()
                .catch(error =>
                    toast.error(
                      // eslint-disable-next-line no-useless-concat
                      (`Login is failed with message:`) + " " + error.message
                    )
                );
        },
    });

  const handleRegister = () => {
    const { name, email, password } = formik.values;
    const body = { name, email, password };
        buttonRef.current = 'register';
        dispatch(authOperations.register(body))
            .unwrap()
            .catch(error =>
                toast.error(
                    // eslint-disable-next-line no-useless-concat
                    (`Register is failed with message:`) + " " + error.message
                )
            );
    };
    return (
        <Container>
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
                   {/* password */}
                    <input
                        className={s.auth_form_input}
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Password"

              />
              </span>
                    <span className={s.auth_form_validation}>
                        {formik.errors.password}
                    </span>
          </label>
          <label className={s.auth_form_label}>
                    <span className={s.auth_form_span}><PasswordIcon/>
                   {/* confirm password */}
                    <input
                        className={s.auth_form_input}
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        placeholder="Confirm password"

              />
            </span>
            <span className={s.auth_form_validation}>
                        {formik.errors.confirmPassword}
                    </span>
          </label>
          <div className={protectionLine(formik.values.password)}></div>
          <label className={s.auth_form_label}>
                    <span className={s.auth_form_span}><NameIcon/>

                    <input
                        className={s.auth_form_input}
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="First Name"

              />
            </span>
            </label>
                <ul className={s.auth_form_inner_btn}>
                    <li className={s.item}>
                        <Link to="/login"
                            className={s.auth_form_btn_login}
                        >
                            Log in
                        </Link>
                    </li>
                    <li className={s.item}>
                        <button
                            className={s.auth_form_btn_register}
                            isLoading={
                                isLoading && buttonRef.current === 'register'
                            }
                            type="button"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
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
                </Container>
    );
};


export default RegisterForm;
