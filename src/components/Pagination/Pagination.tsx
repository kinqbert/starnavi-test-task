import { Dispatch, SetStateAction, useEffect, useState } from "react";
import cn from "classnames";

import "./Pagination.scss";

interface Props {
  pagesAmount: number; // whole amount of pages
  setPageNumber: Dispatch<SetStateAction<number>>; // setter to set page number
  currentPageNumber: number; // current page number
  isLoading: boolean; // needed to disable navigation to prevent age switch before info is loaded
}

export default function Pagination({
  pagesAmount,
  setPageNumber,
  currentPageNumber,
  isLoading,
}: Props) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  // creates array of page numbers
  useEffect(() => {
    const newItemsArray: number[] = [];

    for (let i = 1; i <= pagesAmount; i++) {
      newItemsArray.push(i);
    }

    setPageNumbers(newItemsArray);
  }, [pagesAmount]);

  // if there are no page, nothing will be rendered
  if (pagesAmount === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className={cn("pagination__direction-button", {
          "pagination__direction-button--disabled":
            currentPageNumber === 1 || isLoading,
        })}
        disabled={currentPageNumber === 1 || isLoading}
        onClick={() => setPageNumber(currentPageNumber - 1)}
      >
        {"<"}
      </button>
      <div className="pagination__items">
        {pageNumbers.map((pageNumber) => (
          <button
            onClick={() => setPageNumber(pageNumber)}
            className={cn("pagination__item", {
              "pagination__item--active": currentPageNumber === pageNumber,
            })}
            disabled={isLoading}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className={cn("pagination__direction-button", {
          "pagination__direction-button--disabled":
            currentPageNumber === pagesAmount || isLoading,
        })}
        disabled={currentPageNumber === pagesAmount || isLoading}
        onClick={() => setPageNumber(currentPageNumber + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
