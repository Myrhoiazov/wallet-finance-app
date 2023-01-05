import React, { useState } from 'react';
import { HeaderContent } from './HeaderContent/HeaderContent';
import ModalLogout from '../ModalLogout/ModalLogout.jsx';

const Header = () => {
  const [exit, setExit] = useState(false);
  return (
    <>
      <HeaderContent toExit={() => setExit(!exit)} />
      {exit && <ModalLogout noExit={() => setExit(!exit)} />}
    </>
  );
};

export default Header;
