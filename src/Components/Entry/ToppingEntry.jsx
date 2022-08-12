import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function ToppingEntry({ imagePath, name, updateItemCount }) {
  // const [valueCheck, setValueCheck] = useState(false);

  // const handleCheck = (e) => {
  //   setValueCheck(!valueCheck);
  //   updateItemCount(name, parseInt(e.target.value, 2));
  // };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form>
        <Form.Group controlId={`${name}Check`}>
          <Form.Check
            type="checkbox"
            onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
            label={name}
          />
        </Form.Group>
      </Form>
    </Col>
  );
}

export default ToppingEntry;
