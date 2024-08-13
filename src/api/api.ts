import PeopleResponse from "../types/PeopleResponse";

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

export async function getPersonById(id: string | number) {
  const response = await apiClient.get(
    `https://sw-api.starnavi.io/people/${id}`
  );

  return response.data as PeopleResponse;
}
