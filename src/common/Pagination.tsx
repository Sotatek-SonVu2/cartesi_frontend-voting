import React from 'react';
import { usePagination, DOTS } from '../hook/usePagination';
import { ArrowLeft, ArrowRight, PaginationItem, PaginationWrapper } from '../styled/common';

interface PropsType {
  onPageChange: any,
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PropsType) => {


  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PaginationWrapper>
      <PaginationItem
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <ArrowLeft className="arrow" />
      </PaginationItem>
      {paginationRange.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="dots">&#8230;</li>;
        }
        console.log('pageNumber === currentPage', pageNumber, currentPage)
        return (
          <PaginationItem
            key={index}
            selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}
      <PaginationItem
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <ArrowRight className="arrow" />
      </PaginationItem>
    </PaginationWrapper>
  );
};

export default Pagination;
