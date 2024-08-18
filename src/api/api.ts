import PeopleResponse from "../types/PeopleResponse";
import Person from "../types/Person";
import Film from "../types/Film";
import Starship from "../types/Starship";

import { apiClient } from "./apiClient";

async function getApiResponse<ResponseType>(url: string) {
  const response = await apiClient.get(url);

  return response.data as ResponseType;
}

export async function getPeoplesPage(page = 1, query = "") {
  let url = `https://sw-api.starnavi.io/people/?page=${page}`;

  if (query) {
    url += `&name__contains=${query}`;
  }

  return getApiResponse<PeopleResponse>(url);
}

export async function getPersonById(id: number) {
  return getApiResponse<Person>(`https://sw-api.starnavi.io/people/${id}/`);
}

export async function getFilmsOfPerson(person: Person) {
  const response = await getApiResponse<{ results: Film[] }>(
    `https://sw-api.starnavi.io/films/?id__in=${person.films.join(",")}`
  );

  return response.results;
}

// returns list of starships, that certain person have used in certain film
export async function getStarshipsOfPersonInFilm(
  personId: number,
  filmId: number
) {
  const response = await getApiResponse<{ results: Starship[] }>(
    `https://sw-api.starnavi.io/starships/?pilots=${personId}&films=${filmId}`
  );

  return response.results;
}
