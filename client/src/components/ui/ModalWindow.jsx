import { useEffect } from 'react';
import './ModalWindow.scss';

export default function ModalWindow(props) {
  const { children, isVisible, setIsVisible } = props;

  useEffect(() => {
    console.log('isVisible');
    console.log(isVisible);
  }, [isVisible]);

  if (!isVisible) {
    return <p>NULL</p>;
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
