
import Currency from "shared/components/Currency";
import Header from "shared/components/Header";
import Navigation from "shared/components/Navigation";
import s from './CurrencyMobilePage.module.scss';

const CurrencyMobilePage = () => {
  return (
    <>
      <div className={s.HeaderDiv}>
        <Header />
      </div>
      <div className={s.NavDiv}>
        <Navigation />
      </div>
      <div className={s.CurrencyDiv}>
        <Currency />
      </div>
      
    </>
  );
};
export default CurrencyMobilePage;