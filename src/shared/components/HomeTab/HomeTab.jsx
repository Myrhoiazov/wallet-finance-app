import { formatDate } from 'helpers/formatDate';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';

import s from './HomeTab.module.scss';


const HomeTab = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const transactions = useSelector(selectTransactions);

  const sortedtransactions = [...transactions].sort((lhs,rhs)=>rhs.date - lhs.date);

  return (
    <>
      {isMobile && (
        <div className={s.tableWrapMob}>
          <div className={s.scrollTableMob}>
            <div className={s.scrollTableBodyMob}>
              {sortedtransactions
                .map(el => (
                <table style={{}} key={el._id}>
                  <tbody>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Date</td>
                      <td>{formatDate(el.date)}</td>
                    </tr>
                    <tr style={{backgroundColor: "white", borderRadius: "10px"}}>
                      <td>Type</td>
                      <td>{el.type === "income" ? "+" : "-"}</td>
                    </tr>

                    <tr style={{backgroundColor: "white"}}>
                      <td>Category</td>
                      <td>{el.category}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Comment</td>
                      <td>{el.comments}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Sum</td>
                      <td>{el.amount}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Balance</td>
                      <td>{el.actualBalance}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* desktop and tablet */}
      {!isMobile && (
        <div className={s.tableWrap}>
          <div className={s.scrollTable}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Comment</th>
                  <th>Sum</th>
                  <th>Balance</th>
                </tr>
              </thead>
            </table>

            <div className={s.scrollTableBody}>
              <table>
                <tbody>
                  {sortedtransactions?.map(el => (
                    <tr key={el._id}>
                      <td>{formatDate(el.date)}</td>
                      <td>{el.type === "income" ? "+" : "-"}</td>
                      <td>{el.category}</td>
                      <td>{el.comments}</td>
                      <td>{el.amount}</td>
                      <td>{el.actualBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeTab;
