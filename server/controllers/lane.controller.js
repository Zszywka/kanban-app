//obsluga zapytania do endpointów
//przetwarzanie zapytania i wykonanie odpowiednich modyfikacji na kolekcjach danych
//tutaj: komunikację z naszą bazą MongoDB
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

//odczytanie kolekcji zapisanych linii
export function getLanes(req, res) {
// .find() bez żadnych parametrów zwróci wszystkie dokumenty z kolekcji lanes
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

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

export function deleteLane(req, res) {
//usuwanie polega na odnalezieniu w kolekcji linii modelu z odpowiednim id
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
//wywołaniu na nim metody .remove() i odesłaniu odpowiedzi z kodem 200 (OK)
    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }
  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: req.body.name }).exec((err, oldName) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(oldName);
  });
}

export function moveNoteBetweenLane(req, res) {
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}
		const note = lane.notes.find(note => note.id === req.body.noteId);
		const sourceIndex = lane.notes.indexOf(note);
		lane.notes.splice(sourceIndex, 1);
		lane.save(err => {
			if (err) {
				res.status(500).send(err);
			}
			res.json(lane);
		});
		Lane.findOne({ id: req.body.targetLaneId }).then(targetLane => {
			targetLane.notes.push(note);
			targetLane.save(err => {
				if (err) {
					res.status(500).send(err);
				}
			});
	  });
  });
}
