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

import { useLazyLogOutQuery } from './authApi';
import { onLogOutAction } from './authSlice';
import { unsetToken } from './tokenSlice';

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
      if (e.currentTarget === e.target) {
        noExit();
      }
    },
    [noExit]
  );

  const [logOut] = useLazyLogOutQuery();

  const onHandleLogOut = () => {
    dispatch(onLogOutAction());
    dispatch(unsetToken());
    logOut();
  };

  return createPortal(
    <Overlay onClick={onBackClick}>
      <ModalCont className={'modalLogout'}>
        <ModalLogoutText className={'modalLogoutText'}>
          Are you sure that you want to log out?
        </ModalLogoutText>
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
