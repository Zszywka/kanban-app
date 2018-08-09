import { schema } from 'normalizr';

const note = new schema.Entity('notes');

const lane = new schema.Entity('lanes', {
  notes: [note],
});

export const lanes = [lane];
//stworzyć schematy (podobnie podobnie jak w przypadku Mongoose), dzięki którym
// normalizr będzie wiedział, w jaki sposób przekształcić odpowiedź z serwera do 
// interesującej nas postaci.
