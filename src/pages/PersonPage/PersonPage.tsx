import { useParams } from "react-router-dom";
import "./PersonPage.scss";
import { useEffect, useState } from "react";
import { getPersonById } from "../../api/api";
import Person from "../../types/Person";

export default function PersonPage() {
  const { id: personId } = useParams();
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    if (personId) {
      getPersonById(personId).then((response) => {
        if (response) {
          setPerson(response);
        }
      });
    }
  }, [personId]);

  return <div>{person?.name}</div>;
}
