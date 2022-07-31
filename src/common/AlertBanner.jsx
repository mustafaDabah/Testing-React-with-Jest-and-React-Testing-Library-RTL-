import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertBanner({ message, variant }) {
  const alertMessage = message || 'An unexpected error ocurred . please try again';
  const alertVariant = variant || 'danger';

  return (
    <div>
      <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
        {alertMessage}
      </Alert>
    </div>
  );
}

export default AlertBanner;
