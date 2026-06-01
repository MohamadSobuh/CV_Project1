import React, { useState, useEffect } from 'react';
import style from "./Notification.module.css";

const Notification = ({ show: showProp, text, type = "success" }) => {
  const [show, setShow] = useState(false);
  const [localText, setLocalText] = useState("");
  const [localType, setLocalType] = useState("success");

  useEffect(() => {
    if (showProp !== undefined) {
      setShow(showProp);
      if (text) {
        setLocalText(text);
        setLocalType(type);
      }
    } else if (text) {
      setLocalText(text);
      setLocalType(type);
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showProp, text, type]);

  return (
    <div className={`${style['message-box']} ${show ? style.show : ''} ${style[localType]}`}>
      <div className={style['message-icon']}>
        {localType === 'success' ? '✓' : '✗'}
      </div>
      <div className={style['message-text']}>
        {localText}
      </div>
    </div>
  );
};

export default Notification;