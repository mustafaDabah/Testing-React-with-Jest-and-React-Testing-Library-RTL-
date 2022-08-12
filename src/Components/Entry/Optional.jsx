import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import ScoopEntry from './ScoopEntry';
import AlertBanner from '../../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetailsContext } from '../../context/OrderDetailsContext';
import { formatCurrency } from '../../uttitlties';
import ToppingEntry from './ToppingEntry';

function Optional({ optionsType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [, total, updateItemCount] = useOrderDetailsContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
      .then((response) => setItems(response.data))
      .catch((err) => setError(true));
  }, [optionsType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionsType === 'scoops' ? ScoopEntry : ToppingEntry;

  const optionsItems = items.map(((item) => (
    <ItemComponent
      key={item.name}
      imagePath={item.imagePath}
      name={item.name}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionsType);
      }}
    />
  )));

  const title = optionsType[0].toUpperCase() + optionsType.slice(1).toLowerCase();

  return (
    <>
      <h2>{optionsType}</h2>
      <p>{formatCurrency(pricePerItem[optionsType])} each</p>
      <p>{title} total: {total[optionsType]}</p>
      <Row>
        {optionsItems}
      </Row>
    </>
  );
}

export default Optional;
