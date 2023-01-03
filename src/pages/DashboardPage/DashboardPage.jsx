import Container from 'shared/components/Container';
import DashBoard from 'shared/components/Dashboard';
import s from './DashboardPage.module.scss';

const DashboardPage = () =>{
  return (
    <Container>
      <div className={s.wrapper}>
this is DashboardPage
        <DashBoard/>

    </div>
    </Container>

  );
}

export default DashboardPage;
