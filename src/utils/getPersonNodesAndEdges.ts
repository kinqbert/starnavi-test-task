import { Edge, Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

import { getFilmsOfPerson, getStarshipsOfPersonInFilm } from "../api/api";

import Person from "../types/Person";
import Film from "../types/Film";
import Starship from "../types/Starship";

// TODO -- split into two functions
export default async function getPersonNodesAndEdges(
  person: Person
): Promise<[Node[], Edge[]]> {
  const NODE_WIDTH = 150;

  const FILM_NODES_VERTICAL_OFFSET = 200;
  const FILM_NODES_HORIZONTAL_GAP = 80;
  const FILM_NODES_HORIZONTAL_OFFSET = NODE_WIDTH + FILM_NODES_HORIZONTAL_GAP;

  const STARSHIP_NODES_VERTICAL_GAP = 50;
  const STARSHIP_NODES_VERTICAL_OFFSET = STARSHIP_NODES_VERTICAL_GAP; // TODO -- check if correct

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Fetching all data needed for graph
  const personFilms: Film[] = await getFilmsOfPerson(person.id);

  // Creating nodes and edges
  const mainNode: Node = {
    id: uuidv4(),
    data: { person },
    position: { x: 0, y: 0 },
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
      id: uuidv4(),
      data: { film },
      position: {
        x: currentFilmNodeHorizontalPosition,
        y: FILM_NODES_VERTICAL_OFFSET,
      },
      width: NODE_WIDTH,
    };

    const filmEdge: Edge = {
      id: uuidv4(),
      source: mainNode.id,
      target: filmNode.id,
    };

    nodes.push(filmNode);
    edges.push(filmEdge);

    let currentStarshipNodeVerticalPosition =
      filmNode.position.y + STARSHIP_NODES_VERTICAL_OFFSET;

    const filmStarships: Starship[] = await getStarshipsOfPersonInFilm(
      person.id,
      film.id
    );

    let previousNodeId = filmNode.id;

    for (const starship of filmStarships) {
      if (starship) {
        const starshipNode: Node = {
          id: uuidv4(),
          data: { starship },
          position: {
            x: filmNode.position.x,
            y: currentStarshipNodeVerticalPosition,
          },
          width: NODE_WIDTH,
        };

        const starshipEdge: Edge = {
          id: uuidv4(),
          source: previousNodeId,
          target: starshipNode.id,
        };

        nodes.push(starshipNode);
        edges.push(starshipEdge);

        previousNodeId = starshipNode.id;
        currentStarshipNodeVerticalPosition += STARSHIP_NODES_VERTICAL_OFFSET;
      }
    }
    currentFilmNodeHorizontalPosition += FILM_NODES_HORIZONTAL_OFFSET;
  }

  nodes.forEach((node) => {
    node.type = "customNode";
  });

  return [nodes, edges];
}
