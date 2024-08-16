import PeopleResponse from "../types/PeopleResponse";
import Person from "../types/Person";
import Film from "../types/Film";
import Starship from "../types/Starship";

import { apiClient } from "./apiClient";

export async function getPeoplesPage(page = 1, query = "") {
  if (query) {
    const response = await apiClient.get(
      `https://sw-api.starnavi.io/people/?page=${page}&name__contains=${query}`
    );

    return response.data as PeopleResponse;
  }

  const response = await apiClient.get(
    `https://sw-api.starnavi.io/people/?page=${page}`
  );

  return response.data as PeopleResponse;
  
}

export async function getPersonById(id: number) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/people/${id}/`
  );

  return response.data as Person;
}

export async function getFilmsOfPerson(person: Person) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/films/?id__in=${person.films.join(",")}`
  );

  console.log(response.data)

  return response.data.results as Film[];
}

// returns list of starships, that certain person have used in certain film
export async function getStarshipsOfPersonInFilm(
  personId: number,
  filmId: number
) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/starships/?pilots=${personId}&films=${filmId}`
  );

  return response.data.results as Starship[];
}
