import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Field.css';

const Field = ({ label, value, children, className }) => (
  <div className={classNames(styles.field, className)}>
    {label && <label
      className={styles.label}
      title={label}
    >{label}</label>}
    <span
      className={styles.value}
      title={value}
    >{value}</span>
    {children}
  </div>
);

Field.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
}

Field.defaultProps = {
  value: '',
  className: ''
}

export default Field;