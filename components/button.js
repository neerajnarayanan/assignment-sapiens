import React from 'react';
import styles from '../styles/ButtonStyles.module.css';

function ButtonComponent(props) {
  const { text, status, handleClick, key, updatingData } = props;

  const buttonStatus = status ? "active" : "";

  return (
    <button key={key} className={buttonStatus == 'active' ? styles.BtnActive : styles.BtnNormal}
      onClick={() => { handleClick(updatingData, text) }}>{text}</button>
  );
}

export default ButtonComponent;
