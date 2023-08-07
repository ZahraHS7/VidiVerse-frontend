import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="position-relative my-3">
      <input
        id="searchbox"
        type="text"
        name="query"
        className="form-control searchbox pl-4"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
      <div className="position-absolute search" style={{ top: 10, right: 12 }}>
        <BsSearch />
      </div>
    </div>
  );
}

export default SearchBox;
