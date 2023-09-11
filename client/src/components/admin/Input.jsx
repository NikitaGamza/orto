import Form from 'react-bootstrap/Form';
export default function Input(props) {
  const { title, getter, setter, propName } = props;

  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        onChange={(e) => setter(propName, e.target.value)}
        value={getter[propName]}
        required
      />
    </Form.Group>
  );
}
