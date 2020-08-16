import * as React from 'react';
import classes from './item.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Item = (props) => {
  const { data, onSelect, className, selected = false, ...other } = props;
  const [item, setItemState] = React.useState({selected:selected});

  const toggleSelection = () => {
    setItemState({...item, selected:!item.selected});
  }

  React.useEffect(() => {
    console.log('selected >>',item.selected, data.code);
    onSelect(data, item.selected);
  },[item.selected]);

  //Each airport should display its name, city/country, and airport code
  return (
    <div
      className={clsx(classes.item, className)}
      onClick={toggleSelection}
      {...other}
    >  
    <div className={clsx(classes.name, className)}>{data.name}</div>
    <div className={clsx(classes.code, className)}>{data.code}</div>
    <div className={clsx(classes.city, className)}>{data.city}</div>
    <div className={clsx(item.selected ? classes.selected : classes.notSelected, className)}>
      <FontAwesomeIcon icon={faCheck}/>  
    </div>
    </div>
  );
}

export default Item;