import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import {
  ModalCont,
  ModalLogoutButtonNo,
  ModalLogoutButtonYes,
  ModalLogoutText,
  Overlay,
} from './ModalLogoutComponents';

import OperationsAuth from '../../../redux/Auth/OperationsAuth';

const portal = document.querySelector('#portal');

const ModalLogout = ({ noExit }) => {
  const dispatch = useDispatch();
  const esc = useCallback(
    e => {
      if (e.code === `Escape`) {
        noExit();
      }
    },
    [noExit]
  );

  useEffect(() => {
    window.addEventListener('keydown', esc);

    return () => {
      window.removeEventListener('keydown', esc);
    };
  }, [esc]);

  const onBackClick = useCallback(
    e => {
      if (!e.currentTarget.matches('.portal')) {
        noExit();
      }
    },
    [noExit]
  );

  const logOut = OperationsAuth.logout();

  const onHandleLogOut = () => {
    dispatch(logOut);
  };

  return createPortal(
    <Overlay onClick={onBackClick}>
      <ModalCont>
        <ModalLogoutText>Are you sure that you want to exit?</ModalLogoutText>
        <div>
          <ModalLogoutButtonYes onClick={() => onHandleLogOut()}>
            YES
          </ModalLogoutButtonYes>

          <ModalLogoutButtonNo onClick={noExit}>NO</ModalLogoutButtonNo>
        </div>
      </ModalCont>
    </Overlay>,
    portal
  );
};

export default ModalLogout;
