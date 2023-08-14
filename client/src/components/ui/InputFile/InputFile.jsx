import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './InputFile.scss';

// files //
// imageUrls

// product.image
// // del [1], add files

export default function InputFile(props) {
  const { files, setFiles, onRemove, imageUrls, setImageUrls } = props;

  const inputFileRef = useRef(null);

  const onChangeFileInput = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      setFiles((prevValue) => [...prevValue, file]);

      const url = URL.createObjectURL(file);
      setImageUrls((prevValue) => [...prevValue, url]);
    }
  };

  const onRemoveExtended = (e, index) => {
    const urlsClone = imageUrls;
    urlsClone.splice(index, 1);
    setImageUrls(urlsClone);

    onRemove(e, index);
  };

  return (
    <>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Картинки</Form.Label>
        <button
          onClick={() => {
            inputFileRef.current.value = '';
            inputFileRef.current.click();
          }}
        >
          +
        </button>
        <input
          ref={inputFileRef}
          style={{ display: 'none' }}
          type="file"
          multiple
          onChange={onChangeFileInput}
        />
      </Form.Group>

      <div className={'added-image'}>
        {imageUrls.map((url, index) => (
          <div className="added-image-container">
            <img src={url} alt={'*'} />

            <div>
              <button onClick={(e) => onRemoveExtended(e, index)}>x</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
