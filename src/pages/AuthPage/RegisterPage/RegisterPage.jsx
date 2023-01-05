import RegisterForm from '../../../shared/components/AuthForm/Register/RegisterForm';
// import { MediaQuery } from '../../hooks/useMediaQuery';
import s from '../RegisterPage/RegisterPage.module.scss';

const RegisterPage = () => {
  
    return (
      <section className={s.section_register_page}>
        
          <RegisterForm></RegisterForm>
          {/* <MediaQuery.Desktop>
              <div className={s.inner_images_bp1280px}>
                  <div className={s.inner_images_bp1280px__family}></div>
                  <div className={s.inner_images_bp1280px__bulb}></div>
                  <div className={s.inner_images_bp1280px__family2}></div>
                  <div className={s.inner_images_bp1280px__robot}></div>
              </div>
          </MediaQuery.Desktop>
          <MediaQuery.Tablet>
              <div className={s.inner_images_bp768px}>
                  <div className={s.inner_images_bp768px__family}></div>
                  <div className={s.inner_images_bp768px__bulb}></div>
                  <div className={s.inner_images_bp768px__family2}></div>
              </div>
          </MediaQuery.Tablet>
          <MediaQuery.Mobile>
              <div className={s.inner_images_bp320px}></div>
          </MediaQuery.Mobile> */}
      </section>

  )
}
export default RegisterPage;