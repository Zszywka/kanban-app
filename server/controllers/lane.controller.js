//obsluga zapytania do endpointów
//przetwarzanie zapytania i wykonanie odpowiednich modyfikacji na kolekcjach danych
//tutaj: komunikację z naszą bazą MongoDB
import Lane from '../models/lane';
import uuid from 'uuid';
//addLane sprawdza, czy w ciele zapytania znajduje się parametr name, w którym określamy nazwę linii
export function addLane(req, res) {
  //jeśli nie, odsyła status odp 403-serwer odmawia nawiązania połączenia
  if (!req.body.name) {
    res.status(403).end();
  }
//W przeciwnym wypadku tworzymy nowy model linii na podstawie ciała zapytania.
  const newLane = new Lane(req.body);
// Do nowo utworzonego modelu dodajemy pustą tablicę
  newLane.notes = [];
//unikalny id
  newLane.id = uuid();
//zapisać model do bazy, obsługując przy tym odpowiednio błędy
  newLane.save((err, saved) => {
    if (err) {
    //500-blad servera
      res.status(500).send(err);
    }
    res.json(saved);
  });
}
