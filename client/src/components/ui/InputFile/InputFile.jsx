import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import './InputFile.scss';
import { uploadFile } from '../../../api/product';

export default function InputFile(props) {
  const { setFiles, onRemove, imageUrls, setImageUrls, files } = props;

  const inputFileRef = useRef(null);

  const onChangeFileInput = (event) => {
    const files2 = event.target.files;
    // console.log('uploaded', files2)

    for (let i = 0; i < files2.length; i++) {
      const file = files2[i];
      // console.log('current',file)
      // console.log('all',imageUrls)
      console.log(file);
      const url = URL.createObjectURL(file);
      uploadFileFromInput(url, i);

      setFiles((prevValue) => [...prevValue, file]);
      console.log('afterr', files);
      //
      // const url = URL.createObjectURL(file);
      // console.log(url)
      // setImageUrls((prevValue) => [...prevValue, url]);
    }
  };
  const uploadFileFromInput = async (file, index) => {
    await uploadFile(file, `${index}`);
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
        {imageUrls &&
          imageUrls.map((url, index) => (
            <div className="added-image-container" key={index}>
              <img
                src={`http://localhost:5000/static/images/products/${url}.jpg`}
                alt={'*'}
              />

              <div>
                <button onClick={(e) => onRemoveExtended(e, index)}>x</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
