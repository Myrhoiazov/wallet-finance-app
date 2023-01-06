import LoginForm from '../../../shared/components/AuthForm/Login/LoginForm';
import { MediaQuery } from '../../../hooks/useMediaQuery';
import s from '../LoginPage/LoginPage.module.scss';

const LoginPage = () => {
  
    return (
      <section className={s.section_login_page}>
            <MediaQuery.Desktop>
                <h2 className={s.section_login_page_title}>Finance App</h2>
                <LoginForm></LoginForm>
              <div className={s.inner_images_bp1280px}>
                  <div className={s.inner_images_bp1280px__boyLogo}></div>
                  <div className={s.inner_images_bp1280px__ellipsePingLogo}></div>
                  <div className={s.inner_images_bp1280px__ellipseLogo}></div>
              </div>
          </MediaQuery.Desktop>
            <MediaQuery.Tablet>
            <h2 className={s.section_login_page_title}>Finance App</h2>
                <LoginForm></LoginForm>
              <div className={s.inner_images_bp768px}>
                  <div className={s.inner_images_bp768px__boyLogo}></div>
                  <div width="618px" className={s.inner_images_bp768px__ellipsePingLogo}></div>
                  <div className={s.inner_images_bp768px__ellipseLogo}></div>
              </div>
          </MediaQuery.Tablet>
          <MediaQuery.Mobile>
          <LoginForm></LoginForm>
          </MediaQuery.Mobile>
      </section>

  )
}
export default LoginPage;