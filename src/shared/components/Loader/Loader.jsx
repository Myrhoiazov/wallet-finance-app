import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader}>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />
    </div>
  );
};

export default Loader;
