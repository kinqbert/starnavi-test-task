import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow, // Import the hook
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { getPersonById } from "../../api/api";

import Person from "../../types/Person";

import getPersonNodesAndEdges from "../../utils/getPersonNodesAndEdges";
import getPersonProps from "../../utils/getPersonProps";

import "./PersonPage.scss";
import { PuffLoader } from "react-spinners";

export default function PersonPage() {
  return (
    <ReactFlowProvider>
      <PersonPageChild />
    </ReactFlowProvider>
  );
}

function PersonPageChild() {
  const { id: personId } = useParams();
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsLoading] = useState(true);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (personId) {
      getPersonById(Number(personId)).then(async (response) => {
        if (response) {
          setPerson(response);

          const [personNodes, personEdges] = await getPersonNodesAndEdges(
            response
          );

          setNodes(personNodes);
          setEdges(personEdges);

          setIsLoading(false);
        }
      });
    }
  }, [personId]);

  if (!person) {
    return <h2>Person does not exist...</h2>;
  }

  const personProps = getPersonProps(person, true);

  return (
    <div className="person-page">
      <div className="container">
        <div className="person-page__grid">
          <div className="person-page__info">
            {isLoading ? (
              <div className="person-page__loading-wrapper">
                <PuffLoader />
              </div>
            ) : (
              <>
                <div>
                  <h1 className="person-page__title">{person?.name}</h1>
                  <ul className="person-page__props">
                    {personProps.map((prop) => (
                      <li className="person-page__prop" key={prop.name}>
                        <span className="person-page__prop-name">
                          {prop.name}
                        </span>
                        <span className="person-page__prop-value">
                          {prop.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="person-page__info-buttons">
                  <Link to="..">
                    <button className="person-page__info-button">
                      {"< Return"}
                    </button>
                  </Link>
                  <button
                    className="person-page__info-button"
                    onClick={() => {
                      if (reactFlowInstance) {
                        reactFlowInstance.fitView(); // Fit the view on button click
                      }
                    }}
                  >
                    {"Reset view"}
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="person-page__graph-wrapper">
            {isLoading ? (
              <div className="person-page__loading-wrapper">
                <PuffLoader />
              </div>
            ) : (
              <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
