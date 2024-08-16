import PersonCard from "../PersonCard";

import Person from "../../types/Person";

import "./PeopleList.scss";

interface Props {
  people: Person[];
}

export default function PeopleList({ people }: Props) {
  const placeholderCount = 10; 

  if (!people || people.length === 0) {
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

  return (
    <div className="people-list">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
