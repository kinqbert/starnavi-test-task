import Film from "./Film";
import Person from "./Person";
import Starship from "./Starship";

export default interface PersonData {
  person: Person;
  films: Film[];
  filmStarships: { [filmId: string]: Starship[] };
}
