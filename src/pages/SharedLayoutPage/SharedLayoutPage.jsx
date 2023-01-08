

import React, { Suspense, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { ButtonAddTransactions } from 'shared/components/ButtonAddTransactions/ButtonAddTransactions';
import Container from 'shared/components/Container';
import { ModalAddTransaction } from '../../shared/components/ModalAddTransaction/ModalAddTransaction';
// import Header from '../../shared/components/Header/Header';

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
          {/* <Header /> */}

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
