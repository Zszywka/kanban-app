//kolumny
import mongoose from 'mongoose';
import Note from './note';
//problem: UnhandledPromiseRejectionWarning: MongoError: Unknown modifier: $pushAll.
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  //notes to tablica zawierająca referencje do dokumentów notatek w postaci ObjectId
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});

//wypełnienie linii notatkami->podpiecie hook
function populateNotes(next) {
//.populate() zagwarantuje nam, że odpowiedź z serwera będzie pełna
  this.populate('notes');
  next();
}

//funkcja, która wykona się w odpowiednim momencie wywołania metody .find() na obiekcie
laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);

export default mongoose.model('Lane', laneSchema);
