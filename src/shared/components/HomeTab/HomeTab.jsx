import { useMediaQuery } from 'react-responsive';

import s from './HomeTab.module.scss';
const dataList = [
  {
    date: '04.01.19',
    type: '-',
    category: 'Other',
    comment: 'Gift for your wife',
    sum: 300,
    balance: 6000,
  },
  {
    date: '05.01.19',
    type: '+',
    category: 'Income',
    comment: 'January bonus',
    sum: 300,
    balance: 6000,
  },
  {
    date: '07.01.19',
    type: '-',
    category: 'Car',
    comment: 'Oil',
    sum: 1100,
    balance: 68000,
  },
  {
    date: '07.01.19',
    type: '-',
    category: 'Products',
    comment: 'Vegetables for the week',
    sum: 300,
    balance: 6000,
  },
  {
    date: '07.01.19',
    type: '+',
    category: 'Income',
    comment: 'Gift',
    sum: 3009,
    balance: 6000,
  },
];

const HomeTab = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      {isMobile && (
        <div className={s.tableWrapMob}>
          <div className={s.scrollTableMob}>
            <div className={s.scrollTableBodyMob}>
              {dataList.map(el => (
                <table style={{}}>
                  <tbody>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Date</td>
                      <td>{el.date}</td>
                    </tr>
                    <tr style={{backgroundColor: "white", borderRadius: "10px"}}>
                      <td>Type</td>
                      <td>{el.type}</td>
                    </tr>

                    <tr style={{backgroundColor: "white"}}>
                      <td>Category</td>
                      <td>{el.category}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Comment</td>
                      <td>{el.comment}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Sum</td>
                      <td>{el.sum}</td>
                    </tr>
                    <tr style={{backgroundColor: "white"}}>
                      <td>Balance</td>
                      <td>{el.balance}</td>
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
                  {dataList.map(el => (
                    <tr key={el.comment}>
                      <td>{el.date}</td>
                      <td>{el.type}</td>
                      <td>{el.category}</td>
                      <td>{el.comment}</td>
                      <td>{el.sum}</td>
                      <td>{el.balance}</td>
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
