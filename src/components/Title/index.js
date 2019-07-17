import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import styles from "./Title.css";

export default function Title(props) {
  return (
    <div className={styles.wrapper}> 
      <Typography component="h2" variant="h6" gutterBottom className={classNames(styles.title, props.className)}>
        {props.children}
      </Typography>
    </div>
  );  
}

Title.propTypes = {
  children: PropTypes.node,
};