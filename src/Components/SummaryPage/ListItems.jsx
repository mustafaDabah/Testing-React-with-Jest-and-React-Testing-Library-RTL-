import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function ListItems({ listItem }) {
  return (
    <div>
      {listItem?.map(([key, value]) => (
        <ListGroup.Item key={key}>
          {value} - {key}
        </ListGroup.Item>
      ))}
    </div>
  );
}

export default ListItems;
