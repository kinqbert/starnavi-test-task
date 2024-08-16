import Film from "./Film";
import Starship from "./Starship";

export default interface PersonData {
  films: Film[];
  filmStarships: { [filmId: string]: Starship[] };
}
