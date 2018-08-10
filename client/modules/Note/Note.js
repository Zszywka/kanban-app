import React from 'react';
import PropTypes from 'prop-types'
import styles from './Note.css';

//w srodku sa dzieci komponentu Note
const Note = props =>
  <li className={styles.Note}>{props.children}</li>;

Note.propTypes = {

};

export default Note;
