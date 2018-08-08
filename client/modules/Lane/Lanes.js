import React, { PropTypes } from 'react';
import Lane from './Lane.js';

//mapowaniem tablicy lanes przekazanej przez propsy na komponenty Lane
//rozdzielenie danych o liniach z obiektu lanes na komponenty Lane za pomocą metody .map()
//podczas iteracji po wielu elementach należy wykorzystać props key,(optymalizacja proc. renderujacych)
const Lanes = ({ lanes }) => {
  return (
    <div className="lanes">{lanes.map(lane =>
        <Lane className="lane" key={lane.id} lane={lane} />
    )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
