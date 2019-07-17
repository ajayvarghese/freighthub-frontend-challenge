import React, { Component, useState } from 'react';
import classNames from 'classnames';
import styles from './ContentEditable.css';
import PropTypes from 'prop-types';

class ContentEditable extends Component {
  state = {
    value: '',
    intialValue: ''
  }

  static getDerivedStateFromProps ( props, state ) {
    if (props.value !== state.value && state.intialValue === '') {
      return {
        intialValue: props.value
      };
    };
    return {};
  };

  onKeyDownHandler = (e) => {
    if(e.which === 13) {
      e.preventDefault();
      this.props.onChange(this.state.value);
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
        >{this.state.intialValue}</div>
        <span className={classNames(styles.edit_icon, "flaticon-pencil-edit-button")} />
      </div>
    )
  }
}

ContentEditable.propType = {
  className: PropTypes.string,
  onChange: PropTypes.func,
}

ContentEditable.defaultProps = {
  className: '',
  onChange: f => f,
}

export default ContentEditable;