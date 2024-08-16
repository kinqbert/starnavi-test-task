interface Props {
  type: "person" | "film" | "starship";
}

import "./Icon.scss";

// this component is used to make it easier to use icons
export default function Icon({ type }: Props) {
  switch (type) {
    case "person":
      return <img className="icon" src="/assets/icons/person.svg" alt="Person icon" />;
    case "film":
      return <img className="icon" src="/assets/icons/film.svg" alt="Film icon" />;
    case "starship":
      return <img className="icon" src="/assets/icons/starship.svg" alt="Starship icon" />;
  }
}
