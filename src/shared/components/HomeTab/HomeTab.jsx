import { formatDate } from 'helpers/formatDate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { fetchTransactions } from 'redux/Transaction/transactionsOperations';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';

import s from './HomeTab.module.scss';


const HomeTab = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const transactions = useSelector(selectTransactions);

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchTransactions());
    }, [dispatch]);

    return (
      <>
        {isMobile && (
          <div className={s.tableWrapMob}>
            <div className={s.scrollTableMob}>
              <div className={s.scrollTableBodyMob}>
                {transactions?.length ?
                  ([...transactions]
                  .sort((lhs, rhs) => rhs.date - lhs.date)
                  .map(el => (
                    <table className={el.type === "income" ? s.tablePositive : s.tableNegative} key={el._id}>
                      <tbody>
                        <tr >
                          <td>Date</td>
                          <td>{formatDate(el.date)}</td>
                        </tr>
                        <tr >
                          <td>Type</td>
                          <td>{el.type === "income" ? "+" : "-"}</td>
                        </tr>

                        <tr>
                          <td>Category</td>
                          <td>{el.category}</td>
                        </tr>
                        <tr>
                          <td>Comment</td>
                          <td>{el.comments}</td>
                        </tr>
                        <tr>
                          <td>Sum</td>
                          <td className={el.type === "income" ? s.positive : s.negative}>{el.amount}</td>
                        </tr>
                        <tr>
                          <td>Balance</td>
                          <td>{el.actualBalance}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                  ) :
                  <div>We hove no information about your transaction yet. Please add a new one.</div>
                }
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

                    {transactions?.length ?
                      ([...transactions]
                        .sort((lhs, rhs) => rhs.date - lhs.date)
                        .map(el => (
                      <tr key={el._id}>
                        <td>{formatDate(el.date)}</td>
                        <td>{el.type === "income" ? "+" : "-"}</td>
                        <td>{el.category}</td>
                        <td>{el.comments}</td>
                        <td className={el.type === "income" ? s.positive : s.negative}>{el.amount}</td>
                        <td>{el.actualBalance}</td>
                      </tr>
                      ))) :
                       <div>We hove no information about your transaction yet. Please add a new one.</div>
                    }
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
