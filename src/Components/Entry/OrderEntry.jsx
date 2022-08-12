import React from 'react';
import Button from 'react-bootstrap/Button';
import { useOrderDetailsContext } from '../../context/OrderDetailsContext';
import SummeryForm from '../SummaryPage/SummeryForm';
import GrandTotalEntry from './GrandTotalEntry';
import Optional from './Optional';

function OrderEntry({ setOrderPhase }) {
  const [, total] = useOrderDetailsContext();
  // const isDisable = !(Number(total.scoops.substr(total.scoops.indexOf('$') + 1)) > 0);
  const isDisable = total.scoops === '$0.00';

  return (
    <div>
      <h2>Design Your Sundae</h2>
      <Optional optionsType="scoops" />
      <Optional optionsType="toppings" />
      <GrandTotalEntry />
      <Button onClick={() => setOrderPhase('review')} disabled={isDisable}>Order Sundae</Button>
    </div>
  );
}

export default OrderEntry;
