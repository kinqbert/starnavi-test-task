import PersonCard from "../PersonCard";

import Person from "../../types/Person";

import './PeopleList.scss';

interface Props {
  people: Person[];
}

export default function PeopleList({ people }: Props) {
  return (
    <div className="people-list">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
