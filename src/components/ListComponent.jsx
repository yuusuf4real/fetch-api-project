import React from 'react';

function ListComponent({ items, renderItem }) {
  if (!items || items.length === 0) {
    return <div>No items to display.</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(renderItem)}
    </ul>
  );
}

export default ListComponent;
