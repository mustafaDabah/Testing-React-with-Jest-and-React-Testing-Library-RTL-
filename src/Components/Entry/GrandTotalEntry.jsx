import React from 'react';
import { useOrderDetailsContext } from '../../context/OrderDetailsContext';

function GrandTotalEntry() {
  const [, total] = useOrderDetailsContext();
  return (
    <h2>grand total: {total.grandTotal}</h2>
  );
}

export default GrandTotalEntry;
