import Form from 'react-bootstrap/Form';
export default function Input({ title, product, setProduct, propName }) {
  const setter = (prop, value) => {
    setProduct((prevValue) => ({ ...prevValue, [prop]: value }));
  };

  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        onChange={(e) => setter(propName, e.target.value)}
        value={product[propName]}
        required
      />
    </Form.Group>
  );
}
