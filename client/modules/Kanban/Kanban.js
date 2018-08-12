import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from '../Lane/Lane.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';
//przekazywanie informacji dotyczących linii
//również będzie on odpowiadał za możliwość stworzenia nowej linii
//button umozliwia dodanie nowej linie
const Kanban = (props) => (
  <div>
      <button
        className={styles.AddLane}
        onClick={() => props.createLane({
          name: 'New lane',
        })}
      >Add lane</button>
      <Lanes lanes={props.lanes} />
  </div>
);
//Korzystamy z niego tak naprawdę za każdym razem, kiedy budujemy bardziej
//złożone kreatory akcji, czego przykładem jest właśnie fetchLanes
//Funkcja ta zwraca inną funkcję, dzięki której możemy wybrać odpowiedni
//moment do dispatchowania innego kreatora akcji.
Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  //metodzie .values() możemy uzyskać tablicę wartości danego obiektu,
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
  fetchLanes
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);
