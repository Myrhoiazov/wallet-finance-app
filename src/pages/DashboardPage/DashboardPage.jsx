import { useSelector } from 'react-redux';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';
import userSelectors from 'redux/User/SelectorUser';
import Container from 'shared/components/Container';
import DashBoard from 'shared/components/Dashboard';
import Header from 'shared/components/Header';
import s from './DashboardPage.module.scss';

const DashboardPage = () =>{
  const balance = useSelector(userSelectors.getUserBalance);
  const transactions = useSelector(selectTransactions);
  console.log(transactions, 'transactions')
  console.log(balance)
  return (
    <>
    <Header/>
    <Container>
      <div className={s.wrapper}>
        <DashBoard/>
    </div>
    </Container>
    </>


  );
}

export default DashboardPage;
