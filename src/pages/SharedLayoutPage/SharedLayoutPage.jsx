// import Header from '../../../shared/components/Header';

import React, { Suspense, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { ButtonAddTransactions } from 'shared/components/ButtonAddTransactions/ButtonAddTransactions';
import Container from 'shared/components/Container';
import { ModalAddTransaction } from '../../shared/components/ModalAddTransaction/ModalAddTransaction';
import Header from '../../shared/components/Header/Header';

const SharedLayoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Suspense fallback={null}>
        <Container>
          <Header />
          {/* <h1 style={{ fontFamily: 'var(--title-font) (Poppins)' }}>
            This is title and I use --title-font
          </h1>
          <p style={{ fontFamily: 'var(--main-font) (Circe) ' }}>
            This is text and I use --main-font
          </p>
          <p> This is text and I inherit base font (main-font (Circe) )</p> */}

          <ButtonAddTransactions onModalOpen={openModal} />
          {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
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
