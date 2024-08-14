import { Edge, Node } from "@xyflow/react";
import Person from "../types/Person";
import { getFilmById } from "../api/api";

export default async function getPersonNodesAndEdges(
  person: Person
): Promise<[Node[], Edge[]]> {
  const NODE_HEIGHT = 36;
  const NODE_WIDTH = 150;

  const FILM_NODES_HORIZONTAL_GAP = 50;
  const FILM_NODES_HORIZONTAL_OFFSET = NODE_WIDTH + FILM_NODES_HORIZONTAL_GAP;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // creating main node for the person
  const mainNode: Node = {
    id: `person-${person.id}`,
    data: { label: person.name },
    position: { x: 0, y: 0 },
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  };

  nodes.push(mainNode);

  let currentFilmNodeOffset = -(
    (FILM_NODES_HORIZONTAL_OFFSET * (person.films.length - 1)) /
    2
  );

  // Fetch all film data and create nodes for each film
  const filmNodes = await Promise.all(
    person.films.map(async (filmId) => {
      const response = await getFilmById(filmId);
      const filmNode: Node = {
        id: `film-${response.episode_id}`,
        data: { label: response.title },
        position: { x: currentFilmNodeOffset, y: 100 },
        height: NODE_HEIGHT,
        width: NODE_WIDTH,
      };
      currentFilmNodeOffset += FILM_NODES_HORIZONTAL_OFFSET;
      return filmNode;
    })
  );

  // Creating edges between main person node and each film
  const filmEdges = filmNodes.map((filmNode) => ({
    id: `edge-${mainNode.id}-${filmNode.id}`,
    source: mainNode.id,
    target: filmNode.id,
  }));

  nodes.push(...filmNodes);

  edges.push(...filmEdges);

  return [nodes, edges];
}
