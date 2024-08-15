import Person from "../types/Person";

export default function getPersonProps(person: Person, detailed = false) {

  const props: { name: string; value: string | number }[] = [];

  props.push({ name: "Birth year", value: person.birth_year });
  props.push({ name: "Gender", value: person.gender });
  props.push({ name: "Height", value: person.height });
  props.push({ name: "Mass", value: person.mass });

  if (detailed) {
    props.push({ name: "Homeworld", value: person.homeworld });
    props.push({ name: "Hair color", value: person.hair_color });
    props.push({ name: "Skin color", value: person.skin_color });
    props.push({ name: "Eye color", value: person.eye_color });
  }

  return props;
}
