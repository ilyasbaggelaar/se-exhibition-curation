import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    maxPageButtons?: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    maxPageButtons = 5,
    onPageChange,
}) => {
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    const firstButton = startPage > 2 
    const lastButton = endPage < totalPages - 1;

    const pageButtons = [];

    if (totalPages > 1) {
        if (startPage > 1) {
          pageButtons.push(
            <button
            key={1}
            onClick={() => onPageChange(1)}
            style={buttonStyle(1 === currentPage)}
            >
    1
            </button>
          )
        }
      }

      if (firstButton) {
        pageButtons.push(<span key="start-button">...</span>)
      }


      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            style={buttonStyle(i === currentPage)}
          >
            {i}
          </button>
        );
      }
    
      if (lastButton) {
        pageButtons.push(<span key="end-button">...</span>)
      }
    
      if (endPage < totalPages) {
        pageButtons.push(
          <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          style={buttonStyle(totalPages === currentPage)}
          >
            {totalPages}
          </button>
        )
      }


      return (
        <div style={{ marginTop: "1rem" }}>
          {currentPage > 1 && (
            <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
          )}
          {pageButtons}
          {currentPage < totalPages && (
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
          )}
        </div>
      );
}

const buttonStyle = (isActive: boolean) => ({
    margin: "0 4px",
    padding: "4px 8px",
    backgroundColor: isActive ? "black" : "white",
    color: isActive ? "white" : "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
  });

  export default Pagination