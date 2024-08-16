import { useEffect, useRef, useState } from "react";

import { getPeoplesPage } from "../../api/api";

import PeopleList from "../../components/PeopleList";
import Pagination from "../../components/Pagination";

import Person from "../../types/Person";

import "./MainPage.scss";

export default function MainPage() {
  const [people, setPeople] = useState<Person[]>([]); // list of people
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // current page number
  const pagesAmount = useRef(0);

  // being called after first render and every time page number changes
  useEffect(() => {
    setIsLoading(true);

    // getting people for a page from API
    getPeoplesPage(pageNumber).then((response) => {
      setPeople(response.results);
      pagesAmount.current = Math.ceil(response.count / 10);
      setIsLoading(false);
    });
  }, [pageNumber]);

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="main-page__title">Star Wars Characters</h1>
        <div className="main-page__content-wrapper">
          <PeopleList people={people} />
          <div className="main-page__pagination-wrapper">
            <Pagination
              pagesAmount={pagesAmount.current || 0}
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
