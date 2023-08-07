import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ items, selectedItem, onItemSelect }) => {
  return (
    <div className="sidebar">
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item._id}
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem ? 'list-group-item active' : 'list-group-item'
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default Sidebar;
