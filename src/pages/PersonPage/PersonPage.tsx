import { useParams } from "react-router-dom";
import "./PersonPage.scss";

export default function PersonPage() {
  const { id: personId } = useParams();

  return <div>{personId}</div>;
}
