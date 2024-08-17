import { Handle, Position } from "@xyflow/react";

import Icon from "../Icon";

import Person from "../../types/Person";
import Film from "../../types/Film";
import Starship from "../../types/Starship";
import Attribute from "../../types/Prop";

import {
  getFilmProps,
  getPersonProps,
  getStarshipProps,
} from "../../utils/getAttributes";

import "./CustomNode.scss";

interface Props {
  data: {
    person?: Person;
    film?: Film;
    starship?: Starship;
  };
}

// this is custom node for React Flow to make graph look beautiful
function CustomNode({ data }: Props) {
  const { person, film, starship } = data;

  const attributes: Attribute[] = [];
  let nodeHeader: string = "";
  let icon: React.ReactNode = null;

  // this ifs have to be here to make this component universal for Person, Film and Starship types.
  // depending on what have been passed, different functions will be called and thoroughly different props will be returned
  if (person) {
    nodeHeader = person.name;
    icon = Icon({ type: "person" });
    const personProps = getPersonProps(person);

    attributes.push(...personProps);
  } else if (film) {
    nodeHeader = film.title;
    icon = Icon({ type: "film" });
    const filmProps = getFilmProps(film);

    attributes.push(...filmProps);
  } else if (starship) {
    nodeHeader = starship.name;
    icon = Icon({ type: "starship" });
    const starshipProps = getStarshipProps(starship);

    attributes.push(...starshipProps);
  }

  return (
    <div className="node">
      <div className="node__header">
        <span>{nodeHeader}</span>
        <div className="node__icon-wrapper">{icon}</div>
      </div>
      <ul className="node__props">
        {attributes.map((prop) => (
          <li key={prop.name} className="node__prop">
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
