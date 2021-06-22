import React, { useContext } from 'react';
// import './pagination.scss';
import { SiteContext } from '../../context/site.js';
import usePagination from '../../hooks/paginationHook.js';

export default function Pagination() {
  const [ goToNextPage,goToPreviousPage,changePage,getPaginatedData,getPaginationGroup] = usePagination();
  const context = useContext(SiteContext);
return(
  <div className="pagination">
      <button
        onClick={goToPreviousPage}
        className={`prev ${context.currentPage === 1 ? 'disabled' : ''}`}>
        prev
      </button>

      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={(e) => changePage(item)}
          className={`paginationItem ${context.currentPage === item ? 'active' : null}`}>
          <span>{item}</span>
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className={`next ${context.currentPage === context.pages ? 'disabled' : ''}`}
      >
        next
      </button>
    </div>
  )
}