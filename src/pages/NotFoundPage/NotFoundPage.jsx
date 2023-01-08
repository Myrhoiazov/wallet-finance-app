import { Container } from '@mui/material';
import React from 'react';
import s from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Container>
      <div className={s.notFoundContainer}>
        <h1 className={s.oops}>Oops!</h1>
        <h2 className={s.error}>
          404 <span className={s.errorRed}>ERROR</span>
        </h2>
        <p className={s.text}> Sorry, the page not found</p>
      </div>
    </Container>
  );
};

export default NotFoundPage;
