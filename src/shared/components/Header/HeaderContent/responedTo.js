import { css } from 'styled-components';

const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

const respondTo = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media screen and (min-width: ${breakpoints[label]}) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

// console.log('respondTo', respondTo)

export { respondTo };
