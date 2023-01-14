import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import s from '../Login/LoginForm.module.scss';
import { toast } from 'react-toastify';
import { ReactComponent as GroupLogoIcon } from '../../../../assets/icons/groupLogo.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';
import authOperations from 'redux/Auth/OperationsAuth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(authOperations.login(values))
        .unwrap()
        .then(() => {
          toast.success('Glad to see you again!');
          navigate('/home', { replace: true });
        })
        .catch(error => {
          let message = '';
          if (typeof error.message === 'string') {
            message = error.message;
          } else {
            const keyWord = error.message[0].path[0];
            message = `"${keyWord}" does not meet requirements`;
          }
          toast.error(
            // eslint-disable-next-line no-useless-concat
            `Login is failed with message: ${message}`
          );
        });
    },
  });
  const isDisabled = formik.values.email && formik.values.password;
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={s.auth_form} autoComplete="off">
        <div className={s.auth_form_inner_logo}>
          <GroupLogoIcon className={s.auth_form_logo} />
          <h1 className={s.auth_form_title}>Wallet</h1>
        </div>
        <label className={s.auth_form_label}>
          <EmailIcon className={s.icon} />

          <input
            className={s.auth_form_input}
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="E-Mail"
            required
          />

          <span className={s.auth_form_validation}>{formik.errors.email}</span>
        </label>
        <label className={s.auth_form_label}>
          <PasswordIcon className={s.icon} />

          <input
            className={s.auth_form_input}
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
            required
          />

          <span className={s.auth_form_validation}>{formik.errors.password}</span>
        </label>
        <ul className={s.auth_form_inner_btn}>
          <li className={s.item}>
            <button
              className={s.auth_form_btn_login}
              type="submit"
              disabled={!isDisabled}
            >
              Log in
            </button>
          </li>
          <li className={s.item}>
            <Link to="/register" className={s.auth_form_btn_register}>
              Register
            </Link>
          </li>
        </ul>
        {/* <a
          href="https://wallet-api-kaqj.onrender.com/api-docs/auth/google"
          className={s.auth_form_google_button}
          aria-label="google button"
        >
          <GoogleIcon className={s.auth_form_icon_google} />
          Google
        </a> */}
      </form>
    </>
  );
};

export default LoginForm;
