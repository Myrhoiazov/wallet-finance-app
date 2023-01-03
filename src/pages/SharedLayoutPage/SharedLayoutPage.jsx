// import Header from '../../../shared/components/Header';

import React, { Suspense } from 'react';

import { Outlet } from 'react-router-dom';
import Container from 'shared/components/Container';

const SharedLayoutPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Container>
          <h1 style={{ fontFamily: 'var(--title-font) (Poppins)' }}>
            This is title and I use --title-font
          </h1>
          <p style={{ fontFamily: 'var(--main-font) (Circe) ' }}>
            This is text and I use --main-font
          </p>
          <p> This is text and I inherit base font (main-font (Circe) )</p>
        </Container>
        {/* <Header /> */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Suspense>
    </div>
  );
};

export default SharedLayoutPage;
