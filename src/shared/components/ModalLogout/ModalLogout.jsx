import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';

import {
  ModalCont,
  ModalLogoutButtonNo,
  ModalLogoutButtonYes,
  ModalLogoutText,
  Overlay,
} from './ModalLogoutComponents';

// import { authAPI } from '../../../services/AuthApi';
// import { logOut } from '../../../redux/Auth/OperationsAuth';

const portal = document.querySelector('#portal');

const ModalLogout = ({ noExit }) => {
  // const dispatch = useDispatch();
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

  // const [logOut] = logout();

  const onHandleLogOut = () => {
    console.log('GGGSUHDOUSBDCUB');
    // dispatch(unsetToken());
    // logOut();
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const isMobile = useMediaQuery({ maxWidth: 767 });
  // // const isLoading = useSelector(selectIsLoading);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return createPortal(
    <Overlay onClick={onBackClick}>
      <ModalCont>
        <ModalLogoutText>
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
