import { useContext, useEffect } from 'react';
import './ModalWindow.scss';
import { Store } from '../../Store';

export default function ModalWindow(props) {
  const { children, isVisible, setIsVisible } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-window">
      <div className="modal-window__content">{children}</div>
      <div
        className="modal-window__overlay"
        onClick={() => setIsVisible(false)}
      ></div>
    </div>
  );
}
