import { useEffect, useRef, useState } from "react";

import { getPeoplesPage } from "../../api/api";

import Person from "../../types/Person";

import PeopleList from "../../components/PeopleList";

import "./MainPage.scss";
import Pagination from "../../components/Pagination";
import { PuffLoader } from "react-spinners";

export default function MainPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pagesAmount = useRef(1);

  useEffect(() => {
    setIsLoading(true);

    getPeoplesPage(pageNumber).then((response) => {
      setPeople(response.results);
      setIsLoading(false);
      pagesAmount.current = Math.ceil(response.count / 10);
    });
  }, [pageNumber]);

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="main-page__title">Star Wars Characters</h1>
        <div className="main-page__content-wrapper">
          {isLoading ? (
            <div className="main-page__loading-wrapper">
              <PuffLoader />
            </div>
          ) : (
            <PeopleList people={people} />
          )}
          <div className="main-page__pagination-wrapper">
            <Pagination
              pagesAmount={pagesAmount.current}
              setPageNumber={setPageNumber}
              currentPageNumber={pageNumber}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
