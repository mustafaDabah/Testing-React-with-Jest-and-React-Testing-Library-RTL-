import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useOrderDetailsContext } from '../../context/OrderDetailsContext';
import ListItems from './ListItems';
import SummeryForm from './SummeryForm';

function OrderSummary({ setOrderPhase }) {
  const [optionCounts, total, , listItemsScoops, listItemsToppings] = useOrderDetailsContext();

  console.log(listItemsToppings);

  return (
    <>
      <h2>Order Summary</h2>
      <h4>scoops total: {total.scoops}</h4>
      <ListGroup>
        <ListItems listItem={listItemsScoops} />
      </ListGroup>

      {
        Number((total.toppings.substr(total.toppings.indexOf('$') + 1))) > 0 ? (
          <>
            <h4>toppings total: {total.toppings}</h4>
            <ListGroup>
              <ListItems listItem={listItemsToppings} />
            </ListGroup>
          </>
        ) : (
          null
        )
      }
      <h4>grand total:  {total.grandTotal}</h4>
      <SummeryForm setOrderPhase={setOrderPhase} place="completed" />
    </>
  );
}

export default OrderSummary;
