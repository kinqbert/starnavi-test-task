import PeopleResponse from "../types/PeopleResponse";
import Person from "../types/Person";
import Film from "../types/Film";
import Starship from "../types/Starship";

import { apiClient } from "./apiClient";

export async function getPeopleByAddress(address: string) {
  if (address) {
    const response = await apiClient.get(address);

    return response.data as PeopleResponse;
  } else {
    return {} as PeopleResponse;
  }
}

export async function getPeoplesPage(page = 1) {
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

export async function getFilmById(id: number) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/films/${id}/`
  );

  return response.data as Film;
}

export async function getStarshipById(id: number) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/starships/${id}/`
  );

  return response.data as Starship;
}

export async function getFilmsOfPerson(personId: number) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/films/?characters=${personId}`
  );

  return response.data.results as Film[];
}

export async function getStarshipsOfPersonInFilm(
  personId: number,
  filmId: number
) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/starships/?pilots=${personId}&films=${filmId}`
  );

  return response.data.results as Starship[];
}
