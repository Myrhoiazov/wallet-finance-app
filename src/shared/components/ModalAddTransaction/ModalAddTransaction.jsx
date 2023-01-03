import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import { toast } from 'react-toastify';

// import { useDispatch, useSelector } from 'react-redux';

// import { addTransaction } from 'redux/transactions/transactionsOperations';
// import { selectBalance } from 'redux/auth/auth-selectors';
// import { selectError } from 'redux/transactionSumController/transactionSumControllerSelectors';
// import { changeBalance } from 'redux/auth/auth-slice';

import { formatDate } from 'helpers/formatDate';
import { useToggle } from '../../../hooks/modalAddTransaction';

import css from './ModalAddTransaction.module.scss';
import cssForm from './FormAddTransaction.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime/css/react-datetime.css';

const categoriesInitial = [
  { id: '0', name: 'Main expenses' },
  { id: '1', name: 'Products' },
  { id: '2', name: 'Car' },
  { id: '3', name: 'Self care' },
  { id: '4', name: 'Child care' },
  { id: '5', name: 'Household products' },
  { id: '6', name: 'Leisure' },
  { id: '7', name: 'Other expenses' },
  { id: '8', name: 'Entertainment' },
];

export const ModalAddTransaction = ({ closeModal }) => {
  // const dispatch = useDispatch();
  const categories = categoriesInitial;

  // const error = useSelector(selectError);
  const error = 'Якась там еррор!';
  // const balance = useSelector(selectBalance);
  const balance = 1000;

  const { isShowSelect, toggleHook } = useToggle();

  const [amount, setAmount] = useState('');
  const [valueDate, onChange] = useState(new Date());
  const [transactionDate, setTransactionDate] = useState(
    formatDate(moment(valueDate).format())
  );
  const [comment, setComment] = useState('');
  const [type, setType] = useState('INCOME');
  const [categoryId, setCategoryId] = useState('0');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isShowSelectList, setIsShowSelectList] = useState('false');

  useEffect(() => {
    const closeByEscape = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);
  // }, [closeModal, dispatch]);

  const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const onAddTransaction = transaction => {
    // dispatch(addTransaction({ ...transaction }));
    console.log('dispatch - addTransaction');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value);

        break;
      case 'transactionDate':
        setTransactionDate(value);
        break;
      case 'comment':
        setComment(value);
        break;
      case 'categoryId':
        setCategoryId(value);
        break;

      default:
        return;
    }
  };

  const resetForm = () => {
    setAmount('');
    setComment('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (amount < 0) {
      toast.warning('Amount must be only positive');
      return;
    }
    const amountNegative = -amount;

    if (isShowSelect) {
      if (!amount || !categoryId) {
        toast.error('Please, enter an amount and select category !');
        return;
      }
      if (amount > balance) {
        toast.error('Sorry, your amount exceeds the balance!');
        return;
      }

      onAddTransaction({
        type,
        categoryId,
        amount: amountNegative,
        transactionDate,
        comment,
      });
      // dispatch(changeBalance(amount));
      console.log('dispatch - changeBalance');

      if (error) {
        toast.error(`Sorry, ${error} `);
        return;
      }

      toast.success('Succes! Your amount has been successfully added!');
      resetForm();
      return;
    }

    if (!amount) {
      toast.error('Please, enter an amount!');
      return;
    }
    onAddTransaction({
      type,
      categoryId,
      amount,
      transactionDate,
      comment,
    });

    // dispatch(changeBalance(amountNegative));
    console.log('dispatch - changeBalance');

    if (error) {
      toast.error(`Sorry, ${error} `);
      return;
    }

    toast.success('Succes! Your amount has been successfully added!');
    resetForm();
  };

  const handleCheckBox = e => {
    if (isShowSelect) {
      setType('INCOME');
      setCategoryId('0');
    }

    if (!isShowSelect) {
      setType('EXPENSE');
    }
    toggleHook();
  };

  const handleClickOption = e => {
    setCategoryId(e.currentTarget.value);
    setIsShowSelectList(true);
  };

  const toggleShowSelectList = () =>
    setIsShowSelectList(isShowSelectList => !isShowSelectList);

  return (
    <>
      <div className={css.Overlay} onClick={closeByBackdrop}>
        <div
          className={css.Modal}
          style={{
            color: 'var(--title-black-color)',
          }}
        >
          <h2 className={css.titleForm}>Add transaction</h2>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={css.wraperBtnSpan}>
              <span className={isShowSelect ? css.spanText : css.spanTextGreen}>
                Income
              </span>
              <div className={css.wraperSwitch}>
                <label className={css.container}>
                  <input
                    type="checkbox"
                    className={css.hiddenInput}
                    id="hidden-input"
                    name="toggle"
                    onClick={handleCheckBox}
                  />
                  <span className={css.thumbContainer}>
                    <span className={css.thumb}></span>
                  </span>
                  <span className={css.track}></span>
                </label>
              </div>
              <span
                className={!isShowSelect ? css.spanText : css.spanTextActive}
              >
                Expense
              </span>
            </div>

            {isShowSelect && (
              <div className={cssForm.selectWraper}>
                <ul className={cssForm.selectListWraper}>
                  <label>
                    <input
                      className={cssForm.selectCustom}
                      name="categoryId"
                      type="text"
                      placeholder="Select a category"
                      onClick={toggleShowSelectList}
                      defaultValue={categoryTitle}
                    />
                  </label>
                  {!isShowSelectList && (
                    <div className={cssForm.optionCustomWriper}>
                      {categories
                        .filter(category => category.type !== 'INCOME')
                        .map(category => (
                          <li
                            key={`${category.id}`}
                            onClick={() => setCategoryTitle(category.name)}
                          >
                            <label className={cssForm.selectLabel}>
                              {`${category.name}`}
                              <input
                                className={cssForm.selectOptionItem}
                                name="categoryId"
                                onClick={handleClickOption}
                                onChange={handleChange}
                                defaultValue={`${category.id}`}
                              />
                            </label>
                          </li>
                        ))}
                    </div>
                  )}
                </ul>
              </div>
            )}

            <div className={cssForm.wraperAmountDate}>
              <label>
                <input
                  className={cssForm.inputAmount}
                  name="amount"
                  type="number"
                  min="0.01"
                  placeholder="0.00"
                  defaultValue={amount}
                  onChange={handleChange}
                />
              </label>

              <div className={cssForm.dateTimeWriper}>
                <Datetime
                  className={cssForm.inputDate}
                  name="transactionDate"
                  value={valueDate}
                  onChange={onChange}
                  dateFormat="YYYY-MM-DD"
                  timeFormat={false}
                  onClose={value =>
                    setTransactionDate(formatDate(moment(value).format()))
                  }
                  closeOnSelect={true}
                />
              </div>
            </div>
            <label className={cssForm.commentLabel}>
              <input
                className={cssForm.inputComment}
                style={{
                  color: 'var(--title-black-color)',
                }}
                type="text"
                name="comment"
                placeholder="Comment"
                defaultValue={comment}
                onChange={handleChange}
              />
            </label>

            <div className={cssForm.btnWraper}>
              <button
                className={cssForm.btnAdd}
                onClick={handleSubmit}
                type="submit"
              >
                ADD
              </button>
              <button
                className={cssForm.btnCancel}
                onClick={closeModal}
                type="button"
              >
                CANCEL
              </button>
              <button
                className={css.btnClose}
                onClick={closeModal}
                type="button"
              ></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

ModalAddTransaction.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
