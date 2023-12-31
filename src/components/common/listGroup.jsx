import React from 'react';

const ListGroup = ({ items, textPropertry, valueProperty, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={item === selectedItem ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelect(item)}>
            {item[textPropertry]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textPropertry: "type",
  valueProperty: "_id"
};

export default ListGroup;
