import React, { useRef, useState, useCallback, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ScoopEntry({ imagePath, name, updateItemCount }) {
  const [isValid, setIsValid] = useState(false);

  const handleTheInput = (e) => {
    const currentValue = Number(e.target.value);
    const condition = currentValue >= 0 && currentValue < 11 && currentValue % 1 === 0;
    if (condition) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    updateItemCount(name, !condition ? 0 : currentValue);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>{name}</Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={(e) => handleTheInput(e)} isInvalid={isValid} />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopEntry;
