import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { getPersonById } from "../../api/api";

import Person from "../../types/Person";

import "./PersonPage.scss";
import getPersonNodesAndEdges from "../../utils/getPersonNodesAndEdges";

export default function PersonPage() {
  const { id: personId } = useParams();
  const [person, setPerson] = useState<Person>();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (personId) {
      getPersonById(personId).then(async (response) => {
        if (response) {
          setPerson(response);

          const [personNodes, personEdges] = await getPersonNodesAndEdges(response);

          setNodes(personNodes);
          setEdges(personEdges);
        }
      });
    }
  }, []);

  if (!person) {
    return <h2>Person does not exist...</h2>;
  }

  return (
    <div className="person-page">
      <div className="container">
        <div className="person-page__grid">
          <div className="person-page__info">
            <h1 className="person-page__title">{person?.name}</h1>
          </div>
          <div className="person-page__graph-wrapper">
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
