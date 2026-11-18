export default class Entity {
  name: string;
  value: number;
  desc: string;

  constructor(name: string, value: number, desc: string = 'No desc') {
    this.name = name;
    this.value = value;
    this.desc = desc;
  }
}

// min - inclusive, max - exclusive
function genInt(min: number, max: number) {
  const delta = max - min;
  const rnd = Math.random();

  return Math.floor(rnd * delta) + min;
}

export function genEntities(count: number = 10): Entity[] {
  const firstNames = ['John', 'Jane', 'Adam', 'Eve', 'Geralt', 'Frodo'];
  const lastNames = ['Foo', 'Bar', 'Baz', 'Qux', 'Wiz', 'Qte'];
  const descTemplate = 'Lorem ipsum dolor set amet';

  const pickFirstName = () => firstNames[genInt(0, firstNames.length)];
  const pickLastName = () => lastNames[genInt(0, lastNames.length)];

  const entities: Entity[] = Array(count);

  for (let i = 0; i < count; ++i) {
    entities[i] = new Entity(
      pickFirstName() + ' ' + pickLastName(),
      genInt(0, 100),
      Math.random() < 0.5 ? descTemplate : undefined,
    );
  }

  return entities;
}
