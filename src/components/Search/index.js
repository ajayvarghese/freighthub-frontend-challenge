import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Search.css';
import icons from './../../constants/icons';

const Search = ({ searchKey, setSearchKey }) => (
  <div className={styles.search}>
    <span className={classNames(styles.search_key, icons.search)}></span>
    <input
      type="text"
      value={searchKey}
      className={styles.search_input}
      onChange={setSearchKey}
      placeholder="Search by ID"
    />
  </div>
);

Search.defaultProps = {
  searchKey: '',
  setSearchKey: f => f
};

Search.propTypes = {
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func.isRequired,
};

export default Search;