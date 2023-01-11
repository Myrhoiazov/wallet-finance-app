
import React from "react";
import s from './Currency.module.scss';

export const CurrencyField = ({ currency, purchaseValue, saleValue }) => {
  function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  const sale = minTwoDigits(saleValue.toFixed(2));
  const purchase = minTwoDigits(purchaseValue.toFixed(2));
  return (
    <div className={s.FieldWrap}>
      <div className={s.FieldContainer}>
        <div className={s.FieldItem}>{currency}</div>
        <div className={s.FieldItem}>{purchase}</div>
        <div className={s.FieldItem}>{sale}</div>
      </div>
    </div>
  );
};