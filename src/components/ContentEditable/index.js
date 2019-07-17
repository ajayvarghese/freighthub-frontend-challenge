import React, { Component, useState } from 'react';
import classNames from 'classnames';
import styles from './ContentEditable.css';
import PropTypes from 'prop-types';

class ContentEditable extends Component {
  state = {
    value: ''
  }

  componentDidMount(){
    this.contentEditable.textContent = this.props.value;
  }

  onKeyDownHandler = (e) => {
    if(e.which === 13) {
      e.preventDefault();
      this.props.onChange(this.state.value);
      this.contentEditable.blur();
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      value: e.target.textContent
    })
  }

  render(){
    const { className, onChange } = this.props;
    return (
      <div className={styles.wrapper}>
        <div
          ref={n => { this.contentEditable = n; }}
          className={classNames(styles.content_editable, className)}
          contentEditable
          onKeyDown={this.onKeyDownHandler}
          onInput={this.onChangeHandler}
          onBlur={() => onBlur(this.state.value)}
        />
        <span className={classNames(styles.edit_icon, "flaticon-pencil-edit-button")} />
      </div>
    )
  }
}

ContentEditable.propType = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

ContentEditable.defaultProps = {
  className: '',
  onChange: f => f,
  onChange: f => f,
}

export default ContentEditable;