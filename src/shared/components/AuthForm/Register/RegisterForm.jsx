import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import s from '../Register/RegisterForm.module.scss';
import { toast } from 'react-toastify';
import { ReactComponent as GroupLogoIcon } from '../../../../assets/icons/groupLogo.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';
import { ReactComponent as NameIcon } from '../../../../assets/icons/name.svg';
import authOperations from 'redux/Auth/OperationsAuth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string('Enter email').required('Email is required').email(),
  name: Yup.string('Enter your first name')
    .min(1, 'Too Short!')
    .max(12, 'Too Long!')
    .required('name is required'),
  password: Yup.string('Required password: 1 character, 1 capital letter')
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('1 capital letter, 1 small letter, 1 number, 1 symbol'),
  confirmPassword: Yup.string('Confirm password is must mutch with password')
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema,
    onSubmit: values => {
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
    if (body.name && body.email && body.password) {
      dispatch(authOperations.register(body))
        .unwrap()
        .then(() => {
          toast.success('You have successfully registered');
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
            `Register is failed with message: ${message}`
          );
        });
    } else {
      toast.error(`Please fill in all fields`);
    }
  };
  const isDisabled =
    formik.values.name &&
    formik.values.email &&
    formik.values.password &&
    formik.values.confirmPassword;

  return (
    <>
      <form onSubmit={handleRegister} className={s.auth_form}>
        <div className={s.auth_form_inner_logo}>
          <GroupLogoIcon className={s.auth_form_logo} />
          <h1 className={s.auth_form_title}>Wallet</h1>
        </div>
        <label className={s.auth_form_label}>
          <EmailIcon width={24} height={24} className={s.icon} />

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
          <PasswordIcon width={24} height={24} className={s.icon} />
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
        <label className={s.auth_form_label}>
          <PasswordIcon width={24} height={24} className={s.icon} />
          <input
            className={s.auth_form_input}
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Confirm password"
            required
          />

          <span className={s.auth_form_validation}>{formik.errors.confirmPassword}</span>
        </label>
        <div className={protectionLine(formik.values.password)}></div>
        <label className={s.auth_form_label}>
          <NameIcon width={24} height={24} className={s.icon} />

          <input
            className={s.auth_form_input}
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="First Name"
            required
          />
        </label>
        <ul className={s.auth_form_inner_btn}>
          <li className={s.item}>
            <button
              className={s.auth_form_btn_register}
              type="button"
              onClick={handleRegister}
              disabled={!isDisabled}
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
      </form>
    </>
  );
};

export default RegisterForm;
