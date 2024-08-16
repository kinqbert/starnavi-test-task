import { describe, it, expect, vi } from "vitest";
import createPersonNodesAndEdges from "../utils/createPersonNodesAndEdges";
import {
  mockPerson,
  mockFilms,
  mockStarships,
  mockPersonData,
} from "./mockTestData";

// Mock uuid to make testing deterministic
vi.mock("uuid", () => ({
  v4: vi.fn().mockImplementation(() => "mocked-uuid"),
}));

describe("createPersonNodesAndEdges", () => {
  it("should create nodes and edges for the given person and their films and starships", () => {
    const [nodes, edges] = createPersonNodesAndEdges(mockPersonData);

    expect(nodes.length).toBe(10); // 1 person + 4 films + 5 starships
    expect(edges.length).toBe(9); // 4 (from person to films) + 5 (from films to starships)

    expect(nodes[0]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { person: mockPerson },
        type: "customNode",
      })
    );
    expect(nodes[1]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { film: mockFilms[0] },
        type: "customNode",
      })
    );
    expect(nodes[2]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { starship: mockStarships[mockFilms[0].id][0] },
        type: "customNode",
      })
    );
    expect(nodes[3]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { film: mockFilms[1] },
        type: "customNode",
      })
    );
    expect(nodes[4]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { starship: mockStarships[mockFilms[1].id][0] },
        type: "customNode",
      })
    );
    expect(nodes[5]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { starship: mockStarships[mockFilms[1].id][1] },
        type: "customNode",
      })
    );
    expect(nodes[6]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { film: mockFilms[2] },
        type: "customNode",
      })
    );
    expect(nodes[7]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { starship: mockStarships[mockFilms[2].id][0] },
        type: "customNode",
      })
    );
    expect(nodes[8]).toEqual(
      expect.objectContaining({
        id: "mocked-uuid",
        data: { starship: mockStarships[mockFilms[2].id][1] },
        type: "customNode",
      })
    );
  });

  it("should create nodes and edges even if no starships are present", () => {
    const noStarshipsPersonData = {
      person: mockPerson,
      films: mockFilms,
      filmStarships: {
        1: [],
        2: [],
        3: [],
      },
    };

    const [nodes, edges] = createPersonNodesAndEdges(
      noStarshipsPersonData
    );

    expect(nodes.length).toBe(5); // 1 person node + 4 film nodes
    expect(edges.length).toBe(4); // 4 film edges

    // Check nodes and edges structure
    expect(nodes[0].data.person).toEqual(mockPerson);
    expect(nodes[1].data.film).toEqual(mockFilms[0]);
    expect(nodes[2].data.film).toEqual(mockFilms[1]);
    expect(nodes[3].data.film).toEqual(mockFilms[2]);
    expect(nodes[4].data.film).toEqual(mockFilms[3]);

    expect(edges[0].source).toEqual(nodes[0].id);
    expect(edges[1].source).toEqual(nodes[0].id);
    expect(edges[2].source).toEqual(nodes[0].id);
    expect(edges[3].source).toEqual(nodes[0].id);
  });
});
