import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxPageButtons = 3;

        const createPageButton = (pageNumber) => (
            <button key={pageNumber} className={`pagination-btn pagination-btn-num ${currentPage === pageNumber ? "active" : ""}`} onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
            </button>
        );

        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        if (startPage !== 1) {
            buttons.push(createPageButton(1));
            buttons.push(<span key="first">...</span>);
        }
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(createPageButton(i));
        }
        if (endPage !== totalPages) {
            buttons.push(<span key="last">...</span>);
            buttons.push(createPageButton(totalPages));
        }

        return buttons;
    };

    return (
        <div className="recipes_pagination">
            <button className="pagination-btn pagination-btn-prev" onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="#525252" />
                </svg>
            </button>

            {renderPaginationButtons()}

            <button className="pagination-btn pagination-btn-next" onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="#525252" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
