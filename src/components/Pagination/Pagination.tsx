import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./Pagination.scss";
import cn from "classnames";

interface Props {
  pagesAmount: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  currentPageNumber: number;
  isLoading: boolean;
}

export default function Pagination({
  pagesAmount,
  setPageNumber,
  currentPageNumber,
  isLoading,
}: Props) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const newItemsArray: number[] = [];

    for (let i = 1; i <= pagesAmount; i++) {
      newItemsArray.push(i);
    }

    setPageNumbers(newItemsArray);
  }, [pagesAmount]);

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
          <div
            onClick={() => setPageNumber(pageNumber)}
            className={cn("pagination__item", {
              "pagination__item--active": currentPageNumber === pageNumber,
            })}
          >
            {pageNumber}
          </div>
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
