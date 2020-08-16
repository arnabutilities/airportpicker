import * as React from 'react';
import clsx from 'clsx';
import classes from './card.css';
import defaultClasses from '../default/default.css';


const Card = (props) => {
  const { className, ...other } = props;
  return (
    <div
      className={clsx(defaultClasses.card,
          classes.card,
          className)}
      {...other}
  >{props.children}</div>
  );
};

export default Card;