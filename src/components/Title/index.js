import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import styles from "./Title.css";
import { Link } from 'react-router-dom';

const Title = (props) => (
  <div className={styles.wrapper}> 
    <div className={"layout-container"}>
      <Typography component="h2" variant="h6" className={classNames(styles.title, props.className)}>
        <Link className={styles.link} to="/">{props.children}</Link>
      </Typography>
    </div>
  </div>
);  

Title.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string
};

Title.defaultProps = {
  children: <span />,
  classNames: ''
};

export default Title;