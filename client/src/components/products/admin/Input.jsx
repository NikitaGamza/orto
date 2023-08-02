import Form from 'react-bootstrap/Form';
export default function Input({ title, setProduct, propName }) {
  const setter = (prop, value) => {
    setProduct((prevValue) => ({ ...prevValue, [prop]: value }));
  };

  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        onChange={(e) => setter(propName, e.target.value)}
        required
      />
    </Form.Group>
  );
}
