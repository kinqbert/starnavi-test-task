import PersonCard from "../PersonCard";

import Person from "../../types/Person";

import "./PeopleList.scss";

interface Props {
  people: Person[];
  placeholderCount: number;
  isLoading: boolean;
}

export default function PeopleList({
  people,
  placeholderCount,
  isLoading,
}: Props) {
  if (people.length === 0) {
    if (isLoading) {
      return (
        <div className="people-list">
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div key={index} className="people-list__placeholder">
              Loading...
            </div>
          ))}
        </div>
      );
    }

    return <h2>{"Character with such name does not exist :("}</h2>;
  }

  return (
    <div className="people-list">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
