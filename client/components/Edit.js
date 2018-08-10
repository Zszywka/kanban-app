//możliwe będzie przełączanie między trybem edycji a trybem wyświetlania treści
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './Edit.css';

export default class Edit extends Component {
//sprawdzi każdy klawisz wciśnięty podczas trwania edycji wartości. Jeśli
//wcisniesz Enter, to należy zakończyć edycję za pomocą wcześniej napisanej metody finishEdit.
  checkEnter = (e) => {
    if (e.key === 'Enter') {
        this.finishEdit(e);
    }
  }

// sprawdzamy, czy do propsa onUpdate jest przekazywana funkcja, która wykona się na zakończenie edycji
  finishEdit = (e) => {
    const value = e.target.value;
     if (this.props.onUpdate) {
//wywołujemy ją, ucinając uprzednio zbędne spacje z przodu jak i z tyłu wartości,
        this.props.onUpdate(value.trim());
    }
  }
//wyświetlać krzyżyk, po naciśnięciu którego zostanie wykonana funkcja podpięta pod props onDelete
  renderDelete = () => {
    return <button className={styles.delete} onClick={this.props.onDelete}>×</button>;
  }
//destrukturyzujemy propsy, wyciągając z nich value, onDelete oraz onValueClick
//Wartość wyświetlamy w prostym elemencie <span>, a jeśli do komponentu przekażemy handler onDelete,
//to obok tej wartości pojawi się również przycisk służący do usuwania.
//Wygeneruje go metoda renderDelete. Na kliknięcie wartości wykonujemy dodatkowo metodę onValueClick,
//którą tez przekażemy w propsach.
  renderValue = () => {
    const { value, onDelete, onValueClick } = this.props;
      return (
        <div>
          <span className={styles.value} onClick={onValueClick}>{value}</span>
          {onDelete ? this.renderDelete() : null}
        </div>
      );
  }

//na <input> nakładamy autofocus (atrybut focusujący element), a jako jego domyślną wartość
//jest this.props.value. Input musi również obsłużyć kilka handlerów:
//po opuszczeniu inputa kursorem (zdarzenie blur, czyli utrata focusu), musimy zakończyć tryb edycji.
//To samo powinno się stać po naciśnięciu klawisza Enter, stąd metoda this.checkEnter podpięta pod onKeyPress
  renderEdit = () => {
    return (
      <input
        type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
      />
    );
  }
//Zwracamy prostego diva, który w zależności od trybu,
//w jakim się znajdujemy, wykonuje metodę renderEdit bądź renderValue.
  render() {
    return (
      <div className={this.props.className}>
        {this.props.editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onUpdate: PropTypes.func,
  onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
  editing: PropTypes.bool,
};
