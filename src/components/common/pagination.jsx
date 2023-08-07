import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  if (itemsCount <= pageSize) return null;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const maxVisiblePages = 5;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  const firstVisiblePage = Math.max(currentPage - halfMaxVisiblePages, 1);
  const lastVisiblePage = Math.min(currentPage + halfMaxVisiblePages, pagesCount);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pagesCount;

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className={`page-item ${isPreviousDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            disabled={isPreviousDisabled}
            onClick={() => onPageChange(1)}
          >
            {'«'}
          </button>
        </li>
        <li className={`page-item ${isPreviousDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            disabled={isPreviousDisabled}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {'<'}
          </button>
        </li>
        {firstVisiblePage > 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        )}
        {firstVisiblePage > 2 && <li className="page-item disabled">...</li>}
        {_.range(firstVisiblePage, lastVisiblePage + 1).map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        {lastVisiblePage < pagesCount - 1 && <li className="page-item disabled">...</li>}
        {lastVisiblePage < pagesCount && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(pagesCount)}>
              {pagesCount}
            </button>
          </li>
        )}
        <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            disabled={isNextDisabled}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {'>'}
          </button>
        </li>
        <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            disabled={isNextDisabled}
            onClick={() => onPageChange(pagesCount)}
          >
            {'»'}
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
