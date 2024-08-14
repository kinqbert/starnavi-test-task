import { Edge, Node } from "@xyflow/react";

import Person from "../types/Person";

import { getFilmById, getStarshipById } from "../api/api";
import Film from "../types/Film";

export default async function getPersonNodesAndEdges(
  person: Person
): Promise<[Node[], Edge[]]> {
  const NODE_HEIGHT = 36;
  const NODE_WIDTH = 150;

  const FILM_NODES_HORIZONTAL_GAP = 50;
  const FILM_NODES_HORIZONTAL_OFFSET = NODE_WIDTH + FILM_NODES_HORIZONTAL_GAP;

  const STARSHIP_NODES_VERTICAL_GAP = 30;
  const STARSHIP_NODES_VERTICAL_OFFSET =
    NODE_HEIGHT + STARSHIP_NODES_VERTICAL_GAP;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Fetching all data needed for graph
  const personFilms: Film[] = await Promise.all(
    person.films.map(async (filmId) => {
      return getFilmById(filmId);
    })
  );

  // Creating nodes and edges
  const mainNode: Node = {
    id: `person-${person.id}`,
    data: { label: person.name },
    position: { x: 0, y: 0 },
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  };

  nodes.push(mainNode);

  // Creating nodes for each film
  let currentFilmNodeHorizontalPosition = -(
    (FILM_NODES_HORIZONTAL_OFFSET * (person.films.length - 1)) /
    2
  );

  for (const film of personFilms) {
    const filmNode: Node = {
      id: `film-${film.episode_id}`,
      data: { label: film.title },
      position: { x: currentFilmNodeHorizontalPosition, y: 100 },
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
    };

    const filmEdge: Edge = {
      id: `edge-${mainNode.id}-${filmNode.id}`,
      source: mainNode.id,
      target: filmNode.id,
    };

    nodes.push(filmNode);
    edges.push(filmEdge);

    let currentStarshipNodeVerticalPosition =
      filmNode.position.y + STARSHIP_NODES_VERTICAL_OFFSET;

    for (const starshipId of film.starships) {
      const starship = await getStarshipById(starshipId);

      const starshipNode: Node = {
        id: `starship-${starshipId}`,
        data: { label: starship.name },
        position: {
          x: filmNode.position.x,
          y: currentStarshipNodeVerticalPosition,
        },
        height: NODE_HEIGHT,
        width: NODE_WIDTH,
      };

      // const starshipEdge: Edge = {
      //   id: `edge-${filmNode.id}-${starshipNode.id}`,
      //   source: filmNode.id,
      //   target: starshipNode.id,
      // };

      nodes.push(starshipNode);
      // edges.push(starshipEdge);

      currentStarshipNodeVerticalPosition += STARSHIP_NODES_VERTICAL_OFFSET;
    }

    currentFilmNodeHorizontalPosition += FILM_NODES_HORIZONTAL_OFFSET;
  }

  return [nodes, edges];
}
