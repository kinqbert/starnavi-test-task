import Person from "../types/Person";

export default function getPersonProps(person: Person) {
  const props: { name: string; value: string | number }[] = [];

  props.push({ name: "Birth year", value: person.birth_year });
  props.push({ name: "Gender", value: person.gender });
  props.push({ name: "Height", value: person.height });
  props.push({ name: "Mass", value: person.mass });

  return props;
}
