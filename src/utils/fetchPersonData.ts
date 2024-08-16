import { getFilmsOfPerson, getStarshipsOfPersonInFilm } from "../api/api";

import Person from "../types/Person";
import Starship from "../types/Starship";
import PersonData from "../types/PersonData";

// this function returns all needed data for a certain person, including films and starships for each film
export default async function fetchPersonData(person: Person): Promise<PersonData> {
  const films = await getFilmsOfPerson(person);
  const filmStarships: { [filmId: string]: Starship[] } = {};

  for (const film of films) {
    filmStarships[film.id] = await getStarshipsOfPersonInFilm(person.id, film.id);
  }

  return { person, films, filmStarships };
}
