import React, { useEffect } from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  type,
  currentPage,
  setPrevBtn,
  setNextBtn,
  searchText,
}) => {
  const pageNumbers = [];

  useEffect(() => {
    if (searchText !== "") {
      paginate(1, type);
    }
  }, [searchText]);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example" className="mt-2">
      <ul className="pagination justify-content-end">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : "cursor-pointer"
          }`}
        >
          <a className="page-link" onClick={setPrevBtn}>
            Previous
          </a>
        </li>
        {pageNumbers.map((number, i) => (
          <li
            key={i}
            className={`page-item cursor-pointer ${
              currentPage === number && "active"
            }`}
            onClick={() => paginate(number, type)}
          >
            <a className="page-link">{number}</a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pageNumbers.length ? "disabled" : "cursor-pointer"
          }`}
        >
          <a className="page-link" onClick={setNextBtn}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
