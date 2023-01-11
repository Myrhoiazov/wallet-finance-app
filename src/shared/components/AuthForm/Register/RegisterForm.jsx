import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import s from '../Register/RegisterForm.module.scss';
import { toast } from 'react-toastify';
import { ReactComponent as GroupLogoIcon } from '../../../../assets/icons/groupLogo.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';
import { ReactComponent as NameIcon } from '../../../../assets/icons/name.svg';
// import { ReactComponent as GoogleIcon } from '../../../../assets/icons/google.svg';
// import authSelectors from 'redux/Auth/SelectorAuth';
import authOperations from 'redux/Auth/OperationsAuth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string('Enter email').required('Email is required').email(),
  name: Yup.string('Enter your first name')
    .min(1, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Enter your first name'),
  password: Yup.string('Required password: 1 character, 1 capital letter')
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required password: char.:6-16, at least: 1 capital letter, 1 small letter, 1 number, 1 symbol'),
  confirmPassword: Yup.string('Confirm password is must mutch with password')
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // confirmPassword: Yup.string().when('password', (password, field) =>
  //   password ? field.required().oneOf([Yup.ref('password')]) : field
  // ),
});

const protectionLine = password => {
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
};

const RegisterForm = () => {
  // const buttonRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoading = useSelector(authSelectors.getIsLoading);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema,
    onSubmit: values => {
      // buttonRef.current = 'login';
      dispatch(authOperations.login(values))
        .unwrap()
        .catch(error =>
          toast.error(
            // eslint-disable-next-line no-useless-concat
            `Login is failed with message:` + ' ' + error.message
          )
        );
    },
  });

  const handleRegister = () => {
    const { name, email, password } = formik.values;
    const body = { name, email, password };
    // buttonRef.current = 'register';
    dispatch(authOperations.register(body))
      .unwrap()
      .then(() => {
        toast.success('You have successfully registered');
        navigate('/login', { replace: true });
      })
      .catch(error => {
        let message = '';
        if (typeof error.message === 'string') {
          message = error.message
        }
        else {
          const keyWord =error.message[0].path[0]
          message = `"${keyWord}" does not meet requirements`
        }
        toast.error(
          // eslint-disable-next-line no-useless-concat
          `Register is failed with message: ${message}`
        );
      });
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={s.auth_form}>
        <div className={s.auth_form_inner_logo}>
          <GroupLogoIcon className={s.auth_form_logo} />
          <h1 className={s.auth_form_title}>Wallet</h1>
        </div>
        <label className={s.auth_form_label}>
          <span className={s.auth_form_span}>
            <EmailIcon />

            <input
              className={s.auth_form_input}
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="E-Mail"
            />
          </span>
          <span className={s.auth_form_validation}>{formik.errors.email}</span>
        </label>
        <label className={s.auth_form_label}>
          <span className={s.auth_form_span}>
            <PasswordIcon />
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
          <span className={s.auth_form_span}>
            <PasswordIcon />
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
          <span className={s.auth_form_span}>
            <NameIcon />

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
            <button
              className={s.auth_form_btn_register}
              // isLoading={
              //     isLoading && buttonRef.current === 'register'
              // }
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          </li>
          <li className={s.item}>
            <Link to="/login" className={s.auth_form_btn_login}>
              Log in
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

export default RegisterForm;
