import React, {useEffect} from 'react';
import ReactPaginate from 'react-paginate';

const PaginationControls = ({ totalItems, itemsPerPage, currentPage, onPageChange, items, onItemsChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const pageStart = offset + 1;
    const pageEnd = Math.min(offset + itemsPerPage, totalItems);


    useEffect(() => {
        const offset = currentPage * itemsPerPage;
        const paginatedItems = items.slice(offset, offset + itemsPerPage);
        onItemsChange(paginatedItems);
    }, [currentPage, items, itemsPerPage, onItemsChange])

    return (
        <div className="d-flex justify-content-between align-items-center">
            <p>{`Itens por página: ${pageStart} - ${pageEnd} de ${totalItems}`}</p>
            <ReactPaginate
                previousLabel={<i className="bi bi-chevron-left"></i>}
                nextLabel={<i className="bi bi-chevron-right"></i>}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={'pagination justify-content-end'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
            />
        </div>
    );
}

export default PaginationControls;