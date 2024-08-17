import { useEffect, useRef, useState } from "react";

import { getPeoplesPage } from "../../api/api";

import PeopleList from "../../components/PeopleList";
import Pagination from "../../components/Pagination";

import Person from "../../types/Person";

import "./MainPage.scss";
import SearchField from "../../components/SearchField";

export default function MainPage() {
  const peoplePerPage = 10;

  const [people, setPeople] = useState<Person[]>([]); // list of people
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // current page number
  const pagesAmount = useRef(0);

  const fetchPeople = (page: number, searchQuery?: string) => {
    setIsLoading(true);

    getPeoplesPage(page, searchQuery).then((response) => {
      setPeople(response.results);
      pagesAmount.current = Math.ceil(response.count / 10);
      setIsLoading(false);
    });
  };

  // being called after first render and every time page number changes
  useEffect(() => {
    fetchPeople(pageNumber);
  }, [pageNumber]);

  const onSubmitClick = (inputValue: string) => {
    setPageNumber(1);
    pagesAmount.current = 0;
    fetchPeople(1, inputValue);
  };

  const onResetClick = () => {
    setPageNumber(1);
    pagesAmount.current = 0;
    fetchPeople(1);
  };

  return (
    <div className="main-page">
      <div className="container">
        <header className="main-page__header">
          <h1 className="main-page__title">Star Wars Characters</h1>
          <SearchField
            onSubmitClick={onSubmitClick}
            onResetClick={onResetClick}
          />
        </header>
        <div className="main-page__content-wrapper">
          <PeopleList
            people={people}
            placeholderCount={peoplePerPage}
            isLoading={isLoading}
          />
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
