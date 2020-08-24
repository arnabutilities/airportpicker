import * as React from 'react';
import classes from './item.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Item = (props) => {
  const { data = {}, onToggle, className, selected = false, ...other } = props;
  const [item, setItemState] = React.useState({ selected: selected });

  const toggleSelection = (data, e) => {
    onToggle(data, !item.selected);
    setItemState({ ...item, selected: !item.selected });
  }

  React.useEffect(() => {
    setItemState({ ...item, selected: selected });
  }, [selected]);

  //Each airport should display its name, city/country, and airport code
  return (
    <a
      className={clsx(classes.item, className)}
      onMouseUp={(e) => toggleSelection(data, e)}
      {...other}
    >
      <div className={clsx(classes.name, className, 'name')}>{data.name}</div>
      <div className={clsx(classes.code, className, 'code')}>{data.code}</div>
      <div className={clsx(classes.city, className, 'city')}>{data.city}</div>
      {
      item.selected ? <div className={clsx(classes.selected, className, "checkIcon")} data-visible={item.selected}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </div> : ''}
    </a>
  );
}

export default Item;