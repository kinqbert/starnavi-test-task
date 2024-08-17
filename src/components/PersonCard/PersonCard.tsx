import { useMemo } from "react";
import { Link } from "react-router-dom";

import Person from "../../types/Person";

import { getPersonProps } from "../../utils/getAttributes";

import "./PersonCard.scss";

interface Props {
  person: Person;
}

export default function PersonCard({ person }: Props) {
  const personProps = useMemo(() => getPersonProps(person), [person]);

  return (
    <div className="person-card">
      <div className="person-card__background" />
      <h3 className="person-card__title">{person.name}</h3>
      <ul className="person-card__props">
        {personProps.map((prop) => (
          <li className="person-card__prop" key={prop.name}>
            <span className="person-card__prop-name">{prop.name}</span>
            <span className="person-card__prop-value">{prop.value}</span>
          </li>
        ))}
      </ul>
      <Link to={`/person/${person.id}`}>
        <button className="person-card__button">View Profile</button>
      </Link>
    </div>
  );
}
