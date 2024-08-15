import { Handle, Position } from "@xyflow/react";

import Person from "../../types/Person";
import Film from "../../types/Film";
import Starship from "../../types/Starship";

import {
  getFilmProps,
  getPersonProps,
  getStarshipProps,
} from "../../utils/getProps";

import "./CustomNode.scss";
import Prop from "../../types/Prop";

interface Props {
  data: {
    person?: Person;
    film?: Film;
    starship?: Starship;
  };
}

function CustomNode({ data }: Props) {
  const { person, film, starship } = data;

  const props: Prop[] = [];
  let nodeHeader: string = "";

  if (person) {
    nodeHeader = person.name;
    const personProps = getPersonProps(person);

    props.push(...personProps);
  } else if (film) {
    nodeHeader = film.title;
    const filmProps = getFilmProps(film);

    props.push(...filmProps);
  } else if (starship) {
    nodeHeader = starship.name;
    const starshipProps = getStarshipProps(starship);

    props.push(...starshipProps);
  }

  return (
    <div className="node">
      <div className="node__header">
        <span>{nodeHeader}</span>
      </div>
      <ul className="node__props">
        {props.map((prop) => (
          <li className="node__prop">
            <span className="node__prop-name">{prop.name}</span>
            <span className="node__prop-value">{prop.value}</span>
          </li>
        ))}
      </ul>
      <Handle type="target" position={Position.Top} id="in1" />
      <Handle type="source" position={Position.Bottom} id="out1" />
    </div>
  );
}

export default CustomNode;
