import React from 'react';
import Optional from './Optional';

function OrderEntry() {
  return (
    <div>
      <Optional optionsType="scoops" />
      <Optional optionsType="toppings" />
    </div>
  );
}

export default OrderEntry;
