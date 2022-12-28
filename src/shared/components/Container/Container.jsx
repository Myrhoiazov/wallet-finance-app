import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './Container.module.scss';

const Container = ({ children }) => {
  let classes = classNames(`${s.container} ${s.containerPadding}`);

  return <div className={classes}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Container;
