/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalCont,
  ModalLogoutButtonNo,
  ModalLogoutButtonYes,
  ModalLogoutText,
  Overlay,
} from './ModalLogoutComponents';

const portal = document.querySelector('#portal');

const ModalRegistration = ({ text, children, onCloseModal, btnClose }) => {
  const esc = useCallback(
    e => {
      if (e.code === `Escape`) {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', esc);

    return () => {
      window.removeEventListener('keydown', esc);
    };
  }, [esc]);

  const onBackClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackClick}>
      <ModalCont className={'modalLogout'}>
        {text && <ModalLogoutText>{text}</ModalLogoutText>}
        {btnClose && (
          <ModalLogoutButtonNo onClick={onCloseModal}>
            {btnClose}
          </ModalLogoutButtonNo>
        )}
      </ModalCont>
    </Overlay>,
    portal
  );
};

export default ModalRegistration;
