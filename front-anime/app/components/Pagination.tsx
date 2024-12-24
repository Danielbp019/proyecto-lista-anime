// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // Calcula las páginas visibles
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 10;

    if (totalPages <= maxVisible) {
      // Si hay menos de 10 páginas, muestra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Muestra rango limitado con "..."
      const start = Math.max(1, currentPage - 4);
      const end = Math.min(totalPages, currentPage + 4);

      if (start > 1) {
        pages.push(1); // Agrega la primera página
        if (start > 2) pages.push(-1); // Representa "..."
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push(-1); // Representa "..."
        pages.push(totalPages); // Agrega la última página
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
      {visiblePages.map((page, index) =>
        page === -1 ? (
          <span key={index} className="btn btn-sm btn-disabled">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`btn btn-sm ${page === currentPage ? 'btn-active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
