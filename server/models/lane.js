//kolumny
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//problem: UnhandledPromiseRejectionWarning: MongoError: Unknown modifier: $pushAll.
mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  //notes to tablica zawierająca referencje do dokumentów notatek w postaci ObjectId
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});

export default mongoose.model('Lane', laneSchema);
