// import { useState, useEffect } from "react";
// import React from "react";
// import apiService from './CurrencyApi';
// // import getCurrencyRates from './CurrencyApi';
// import Loader from "../Loader";
// import s from './Currency.module.scss';
// import { formatDate } from "helpers/formatDate";

// const Currency = () => {
//     const [currencyRates, setCurrencyRates] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentDate, setCurrentDate] = useState();
//   const HOUR = 3600000;

//   useEffect(() => {
//     // getRates();
//     getCurrencyRates()
//     //  eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // const getRates = () => {
//   //   setIsLoading(true);

//   //   apiService
//   //     .getCurrencyRates()
//   //     .then(data => {
//   //       console.log(data)
//   //       setCurrencyRates(data);
//   //       setIsLoading(false);
//   //       setCurrentDate(formatDate('yyyy-mm-dd'));
//   //       setLocalStorage(currencyRates, currentDate);
//   //     })
//   //     .catch(err => {
//   //       const currencyFromLocalStorage = JSON.parse(
//   //         localStorage.getItem('currency'),
//   //       );
//   //       if (
//   //         !currencyFromLocalStorage ||
//   //         currentDate !== currencyFromLocalStorage.date
//   //       )
//   //         return setTimeout(getRates, HOUR);

//   //       setCurrencyRates(currencyFromLocalStorage.data);
//   //       console.log(err);
//   //     });
//   // };
  
//   const setLocalStorage = (currencyRates, currentDate) => {
//     const localStorageData = { 
//       rates: currencyRates,
//       date: currentDate };
//     localStorage.setItem('currency', JSON.stringify(localStorageData));
//   };

//   const round = number => {
//     return parseFloat(number).toFixed(2);
//   };


//   return (
//     <div className={s.wrapper}>
//       {isLoading && <Loader />}
//       <table className={s.table}>
//         <thead className={s.thead}>
//           <tr>
//             <th className={s.left}>Currensy</th>
//             <th className={s.center}>Purchase</th>
//             <th className={s.right}>Sell</th>
//           </tr>
//         </thead>
//         <tbody className={s.tbody}>
//           {currencyRates?.map(
//             item =>
//               item.currencyCodeB === 'UAH' && (
//                 <tr key={item.currencyCodeA} className={s.traw}>
//                   <td className={s.ccy}>{item.currencyCodeA}</td>
//                   <td className={s.ccy}>
//                     {round(item.rateBuy)}
//                   </td>
//                   <td className={s.td}>
//                     {round(item.rateCross)}
//                   </td>
//                 </tr>
//               ),
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Currency;
