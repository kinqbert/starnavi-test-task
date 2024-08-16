import Film from "../types/Film";
import Person from "../types/Person";
import Prop from "../types/Prop";
import Starship from "../types/Starship";

export function getPersonProps(person: Person, detailed = false) {
  const props: Prop[] = [];

  props.push({ name: "Birth year", value: person.birth_year });
  props.push({ name: "Gender", value: person.gender });
  props.push({ name: "Height", value: person.height });
  props.push({ name: "Mass", value: person.mass });

  if (detailed) {
    props.unshift({ name: "ID", value: person.id });
    props.push({ name: "Homeworld", value: person.homeworld });
    props.push({ name: "Hair color", value: person.hair_color });
    props.push({ name: "Skin color", value: person.skin_color });
    props.push({ name: "Eye color", value: person.eye_color });
  }

  return props;
}

export function getFilmProps(film: Film) {
  const props: Prop[] = [];

  props.push({ name: "ID", value: film.id });
  props.push({ name: "Episode ID", value: film.episode_id });
  props.push({ name: "Director", value: film.director });
  props.push({ name: "Release date", value: film.release_date });

  return props;
}

export function getStarshipProps(starship: Starship) {
  const props: Prop[] = [];

  props.push({ name: "ID", value: starship.id });
  props.push({ name: "Class", value: starship.starship_class });
  props.push({ name: "Manufacturer", value: starship.manufacturer });
  props.push({ name: "Cost (CR)", value: starship.cost_in_credits });
  props.push({ name: "Crew", value: starship.crew });
  props.push({ name: "Passengers", value: starship.passengers });
  props.push({ name: "Hyperdrive rating", value: starship.hyperdrive_rating });
  props.push({ name: "MGLT", value: starship.MGLT });
  props.push({ name: "Cargo capacity", value: starship.cargo_capacity });
  props.push({ name: "Consumables", value: starship.consumables });

  return props;
}
