import * as React from 'react';
import clsx from 'clsx';
import classes from './search.css';
import defaultClasses from '../default/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {
  const { onSearch, onReset, onClearSelection, totalRecords, totalSelection, className, ...other } = props;
  const searchRef = React.useRef(null);

  const clearSearch = () => {
    console.log('clear search clicked');
    searchRef.current.value = "";
    searchRef.current.focus();
    onReset();
  }

  const clearSelection = () => {
    onClearSelection();
  }

  return (
    <div
      className={clsx(classes.searchContainer, className)}
      {...other}
    >
      <input ref={searchRef} className={clsx(defaultClasses.inputBox, classes.inputBox)} onChange={onSearch} placeholder="SEARCH BY AIRPORT NAME OR CITY NAME..." id="search"/>
      <div className={clsx(classes.clearSection, totalRecords > 0 ? classes.visible : classes.invisible)}>
        <div className={clsx(classes.clearInfo)}>{totalRecords > 999 ? "999+" : totalRecords} </div>
        <div className={clsx(classes.clearCloseButton)}>
        <FontAwesomeIcon onClick={clearSearch} icon={faTimesCircle} />
        </div>
      </div>
      <div className={clsx(classes.totalSection, totalSelection.length > 0 ? classes.visible : classes.invisible)}>
        <div className={clsx(classes.clearInfo)}>Selected {totalSelection.length > 999 ? "999+" : totalSelection.length} </div>
        <div className={clsx(classes.clearCloseButton)}>
        <FontAwesomeIcon onClick={clearSelection} icon={faTimesCircle} />
        </div>
      </div>
    </div>
  );
};
export default Search;