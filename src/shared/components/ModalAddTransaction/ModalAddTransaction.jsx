import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import moment from 'moment';

import { useToggle } from '../../../hooks/modalAddTransaction';

import { selectTransactionCategories } from 'redux/Categories/categoriesSelectors';
import { fetchCategories } from 'redux/Categories/categoriesOperations';
import {  updateTransaction } from 'redux/Transaction/transactionsOperations';

import css from './ModalAddTransaction.module.scss';
import cssForm from './FormAddTransaction.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime/css/react-datetime.css';
import userOperations from 'redux/User/OperationsUser';

export const ModalAddTransaction = ({ closeModal }) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectTransactionCategories);

  const { isShowSelect, toggleHook } = useToggle();

  const [amount, setAmount] = useState('');
  const [valueDate, setValueDate] = useState(new Date());
  const [date, setDate] = useState(valueDate);
  const [comment, setComment] = useState('');
  const [type, setType] = useState('income');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isShowSelectList, setIsShowSelectList] = useState('false');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const closeByEscape = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
      dispatch(userOperations.getUserInfo());
    };
  }, [closeModal, dispatch]);

  const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const onAddTransaction = transaction => {
    dispatch(updateTransaction({ ...transaction }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'date':
        setDate(value);
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
    setValueDate(new Date());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (amount < 0) {
      toast.warning('Amount must be only positive');
      return;
    }

    if (isShowSelect) {
      if (!amount || !categoryId) {
        toast.error('Please, enter an amount and select category!');
        return;
      }

      if (!comment) {
        toast.error('Please, enter a comments!');
        return;
      }

      onAddTransaction({
        type,
        category: categories.find(({ id }) => id === Number(categoryId))?.value,
        amount: Number(amount),
        date: moment(date).valueOf(),
        comments: comment,
      });

      toast.success('Succes! Your amount has been successfully added!');
      resetForm();
      return;
    }

    if (!amount) {
      toast.error('Please, enter an amount!');
      return;
    }

    if (!comment) {
      toast.error('Please, enter a comments!');
      return;
    }

    onAddTransaction({
      type,
      category: categories.find(({ id }) => id === Number(categoryId))?.value,
      amount: Number(amount),
      date: moment(date).valueOf(),
      comments: comment,
    });

    toast.success('Succes! Your amount has been successfully added!');
    resetForm();
  };

  const handleCheckBox = e => {
    if (isShowSelect) {
      setType('income');
      setCategoryId('0');
    }

    if (!isShowSelect) {
      setType('expense');
    }
    toggleHook();
  };

  const handleSetDateChange = date => {
    setValueDate(date);
  };

  const handleClickOption = e => {
    setCategoryId(e.currentTarget.value);
    setIsShowSelectList(true);
  };

  const toggleShowSelectList = () => {
    setIsShowSelectList(isShowSelectList => !isShowSelectList);
  };

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
                income
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
                expense
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
                      required
                    />
                  </label>
                  {!isShowSelectList && (
                    <div className={cssForm.optionCustomWriper}>
                      {categories
                        .filter(category => category.type !== 'income')
                        .map(category => (
                          <li
                            key={`${category.id}`}
                            onClick={() => setCategoryTitle(category.value)}
                          >
                            <label className={cssForm.selectLabel}>
                              {`${category.value}`}
                              <input
                                className={cssForm.selectOptionItem}
                                name="categoryId"
                                onClick={handleClickOption}
                                onChange={handleChange}
                                defaultValue={`${category.id}`}
                                required
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
                  value={amount}
                  onChange={handleChange}
                />
              </label>

              <div className={cssForm.dateTimeWriper}>
                <Datetime
                  className={cssForm.inputDate}
                  name="date"
                  value={valueDate}
                  onChange={handleSetDateChange}
                  dateFormat="YYYY-MM-DD"
                  timeFormat={false}
                  onClose={value => setDate(moment(value).format())}
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
                value={comment}
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
