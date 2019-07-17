import React from 'react';
import classNames from 'classnames';
import styles from './Pill.css';

const Pill = ({ children, type }) => (
  <span className={classNames(styles.wrapper, styles[type])}>
    {children}
  </span>
)

export default Pill;