import React from 'react';
import PropTypes from 'prop-types'
import Lane from './LaneContainer.js';

import styles from './Lane.css';
//mapowaniem tablicy lanes przekazanej przez propsy na komponenty Lane
//rozdzielenie danych o liniach z obiektu lanes na komponenty Lane za pomocą metody .map()
//podczas iteracji po wielu elementach należy wykorzystać props key,(optymalizacja proc. renderujacych)
const Lanes = ({ lanes }) => {
  return (
    <div className={styles.Lanes}>{lanes.map(lane => (
      <Lane className="lane" key={lane.id} lane={lane} />
    ))}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
