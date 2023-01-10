/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import axios from 'axios';
import ratesData from '../Currency';


const getCurrencyRates = () => 
  axios
    .get('https://api.monobank.ua/bank/currency')
        .then(response => {
        console.log(response.data)
        return response.data;
        
    })
    .catch(err => {
      let errData = err;
      if (err instanceof Error) {
          errData = err.response;
          console.error(`${err.name}: ${err.message}`)
      }
      console.log(errData);
      return ratesData;
    });

export default { getCurrencyRates };
