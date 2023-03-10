import Container from 'shared/components/Container';
import Currency from 'shared/components/Currency';
import Header from 'shared/components/Header';
import Navigation from 'shared/components/Navigation';
import s from './CurrencyMobilePage.module.scss';

const CurrencyMobilePage = () => {
  return (
    <>
      <div className={s.HeaderDiv}>
        <Header />
      </div>
      <Container>
        <div className={s.WrapDiv}>
          <div className={s.NavDiv}>
            <Navigation />
          </div>
          <div className={s.CurrencyDiv}>
            <Currency />
          </div>
        </div>
      </Container>
    </>
  );
};
export default CurrencyMobilePage;
