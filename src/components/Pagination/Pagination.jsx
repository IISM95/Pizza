import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";


const Pagination = ({onChangePage, currentPage}) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event)=>onChangePage(event.selected + 1)}//костыльный метод из-за бека 
        pageRangeDisplayed={4}
        pageCount={3}
		  forcePage={currentPage-1}//надо передать 0 а в слайсе1 поэтому 1-1
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

//<ReactPaginate все скопировано как есть из инструкции https://www.npmjs.com/package/react-paginate pageCount-сколько страниц pageRangeDisplayed-сколько элементов на странице
