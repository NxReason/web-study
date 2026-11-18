export default class Entity {
    name;
    value;
    desc;
    constructor(name, value, desc = 'No desc') {
        this.name = name;
        this.value = value;
        this.desc = desc;
    }
}
// min - inclusive, max - exclusive
function genInt(min, max) {
    const delta = max - min;
    const rnd = Math.random();
    return Math.floor(rnd * delta) + min;
}
export function genEntities(count = 10) {
    const firstNames = ['John', 'Jane', 'Adam', 'Eve', 'Geralt', 'Frodo'];
    const lastNames = ['Foo', 'Bar', 'Baz', 'Qux', 'Wiz', 'Qte'];
    const descTemplate = 'Lorem ipsum dolor set amet';
    const pickFirstName = () => firstNames[genInt(0, firstNames.length)];
    const pickLastName = () => lastNames[genInt(0, lastNames.length)];
    const entities = Array(count);
    for (let i = 0; i < count; ++i) {
        entities[i] = new Entity(pickFirstName() + ' ' + pickLastName(), genInt(0, 100), Math.random() < 0.5 ? descTemplate : undefined);
    }
    return entities;
}
