import Person from "./Person";

export default interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
