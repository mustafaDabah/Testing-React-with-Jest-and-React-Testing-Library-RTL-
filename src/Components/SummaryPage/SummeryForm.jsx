import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axios from 'axios';

function SummeryForm() {
  const [enableConfirmBtn, setEnableConfirmBtn] = useState(true);

  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        no ice cream will actually deliver
      </Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>
          Terms and Conditions
        </span>
      </OverlayTrigger>
    </span>

  );

  return (
    <>
      {/* <PopoverModel /> */}
      <Form style={{ display: 'flex' }}>
        <Form.Group controlId="checkConditionAndTerms">
          <Form.Check type="checkbox" id="checkConditionAndTerms" onChange={() => setEnableConfirmBtn(!enableConfirmBtn)} label={checkboxLabel} />
          <Button variant="primary" type="submit" disabled={enableConfirmBtn}>confirm order</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default SummeryForm;
