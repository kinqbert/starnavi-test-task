import Film from "../types/Film";
import Person from "../types/Person";
import Attribute from "../types/Prop";
import Starship from "../types/Starship";

export function getPersonProps(person: Person, detailed = false) {
  const attributes: Attribute[] = [];

  attributes.push({ name: "Birth year", value: person.birth_year });
  attributes.push({ name: "Gender", value: person.gender });
  attributes.push({ name: "Height", value: person.height });
  attributes.push({ name: "Mass", value: person.mass });

  if (detailed) {
    attributes.unshift({ name: "ID", value: person.id });
    attributes.push({ name: "Homeworld", value: person.homeworld });
    attributes.push({ name: "Hair color", value: person.hair_color });
    attributes.push({ name: "Skin color", value: person.skin_color });
    attributes.push({ name: "Eye color", value: person.eye_color });
  }

  return attributes;
}

export function getFilmProps(film: Film) {
  const attributes: Attribute[] = [];

  attributes.push({ name: "ID", value: film.id });
  attributes.push({ name: "Episode ID", value: film.episode_id });
  attributes.push({ name: "Director", value: film.director });
  attributes.push({ name: "Release date", value: film.release_date });

  return attributes;
}

export function getStarshipProps(starship: Starship) {
  const attributes: Attribute[] = [];

  attributes.push({ name: "ID", value: starship.id });
  attributes.push({ name: "Class", value: starship.starship_class });
  attributes.push({ name: "Cost (CR)", value: starship.cost_in_credits });
  attributes.push({ name: "Crew", value: starship.crew });
  attributes.push({ name: "Passengers", value: starship.passengers });
  attributes.push({ name: "Hyperdrive rating", value: starship.hyperdrive_rating });
  attributes.push({ name: "MGLT", value: starship.MGLT });
  attributes.push({ name: "Cargo capacity", value: starship.cargo_capacity });
  attributes.push({ name: "Consumables", value: starship.consumables });

  return attributes;
}
