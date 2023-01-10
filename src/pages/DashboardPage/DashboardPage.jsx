import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectIsLoading } from 'redux/Transaction/transactionsSelectors';
import { ButtonAddTransactions } from 'shared/components/ButtonAddTransactions/ButtonAddTransactions';
import Container from 'shared/components/Container';
import DashBoard from 'shared/components/Dashboard';
import Header from 'shared/components/Header';
// import Loader from 'shared/components/Loader';
import { ModalAddTransaction } from 'shared/components/ModalAddTransaction/ModalAddTransaction';
import s from './DashboardPage.module.scss';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const isLoading = useSelector(selectIsLoading);
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
                            <div className={s.images__pink}></div>
                  <div className={s.images__purple}></div>
          <DashBoard />
        </div>
      </Container>

      <ButtonAddTransactions onModalOpen={openModal} />
      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
      {/* {isLoading && <Loader/>} */}

    </>
  );
};

export default DashboardPage;
