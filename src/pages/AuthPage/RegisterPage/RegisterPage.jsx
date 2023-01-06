import RegisterForm from '../../../shared/components/AuthForm/Register/RegisterForm';
import { MediaQuery } from '../../../hooks/useMediaQuery';
import s from '../RegisterPage/RegisterPage.module.scss';

const RegisterPage = () => {
  
    return (
      <section className={s.section_register_page}>
        <MediaQuery.Desktop>
        <h2 className={s.section_register_page_title}>Finance App</h2>
        <RegisterForm></RegisterForm>
              <div className={s.inner_images_bp1280px}>
                  <div className={s.inner_images_bp1280px__family}></div>
                  <div className={s.inner_images_bp1280px__bulb}></div>
                  <div className={s.inner_images_bp1280px__family2}></div>
                  <div className={s.inner_images_bp1280px__robot}></div>
              </div>
          </MediaQuery.Desktop>
        <MediaQuery.Tablet>
        <h2 className={s.section_register_page_title}>Finance App</h2>
        <RegisterForm></RegisterForm>
              <div className={s.inner_images_bp768px}>
              <div className={s.inner_images_bp768px__girlLogo}></div>
                  <div width="618px" className={s.inner_images_bp768px__ellipsePingLogo}></div>
                  <div className={s.inner_images_bp768px__ellipseLogo}></div>
              </div>
          </MediaQuery.Tablet>
        <MediaQuery.Mobile>
        <RegisterForm></RegisterForm>
              <div className={s.inner_images_bp320px}></div>
          </MediaQuery.Mobile>
      </section>

  )
}
export default RegisterPage;