import { useState } from 'react';
import { ButtonAddTransactions } from 'shared/components/ButtonAddTransactions/ButtonAddTransactions';
import Container from 'shared/components/Container';
import DashBoard from 'shared/components/Dashboard';
import Header from 'shared/components/Header';
import { ModalAddTransaction } from 'shared/components/ModalAddTransaction/ModalAddTransaction';
import s from './DashboardPage.module.scss';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Header />
      <Container>
        <div className={s.wrapper}>
          <DashBoard />
        </div>
      </Container>

      <ButtonAddTransactions onModalOpen={openModal} />
      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </>
  );
};

export default DashboardPage;
