import { useEffect, useState } from 'react';
import axios from 'axios';
// import Loader from '../Loader';
import { CurrencyField } from './CurrencyField';
import s from './Currency.module.scss';
import Loader from '../Loader';


  const Currency = () => {
  const [rateUsd, setRateUsd] = useState(null);
  const [rateEur, setRateEur] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

  const saveRates = data => {
    data.forEach(el => {
      if (el.currencyCodeA === 840 && el.currencyCodeB === 980) {
        const dataToSave = {
          rateBuy: el.rateBuy,
          rateSell: el.rateSell,
        };
        setRateUsd(dataToSave);
      }
      if (el.currencyCodeA === 978 && el.currencyCodeB === 980) {
        const dataToSave = {
          rateBuy: el.rateBuy,
          rateSell: el.rateSell,
        };
        setRateEur(dataToSave);
      }

    });
  };

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('currencyRates'));
    const storageUpdatedTime = storageData?.updatedDate;
    const timeNow = new Date().getTime();
    const notShouldFetch = storageUpdatedTime - timeNow <= 3600000;

    if (!notShouldFetch) {
      axios
        .get('https://api.monobank.ua/bank/currency')
        .then(res => res.data)
        .then(res => {
             setIsLoading(true);
          const currencyRates = {
            updatedDate: new Date().getTime(),
            res,
          };
          localStorage.setItem('currencyRates', JSON.stringify(currencyRates));
          saveRates(res);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
      return;
    }

    saveRates(storageData.res);
  }, []);

  return (
    <>
     {isLoading ? (
        <Loader />
      ) :( < div className={s.CurrencyContainer}>
        <div className={s.Head}>
          <div className={s.TitleList}>
            <div className={s.TitleItem}>
              <div className={s.Title}>Currency</div>
            </div>
            <div className={s.TitleItem}>
              <div className={s.Title}>Purchase</div>
            </div>
            <div className={s.TitleItem}>
              <div className={s.Title}>Sale</div>
            </div>
          </div>
        </div>
        {rateUsd?.rateBuy && (
          <div>
            <ul>
              <CurrencyField
                currency="USD"
                purchaseValue={rateUsd?.rateBuy}
                saleValue={rateUsd?.rateSell}
              />
              <CurrencyField
                currency="EUR"
                purchaseValue={rateEur?.rateBuy}
                saleValue={rateEur?.rateSell}
              />
              
            </ul>
          </div>
        )}
        < div className={s.CurrencyBg}></div>
      </div>)}
    </>
  );
};

export default Currency;


 