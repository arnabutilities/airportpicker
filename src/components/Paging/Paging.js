import * as React from 'react';
import clsx from 'clsx';
import classes from './paging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
  },
};

const Paging = (props) => {
  const {
    totalRecord,
    recordPerPage,
    initialIndex,
    onPageChange,
    className, ...other } = props;
 
    const [paging, setPagingState] = React.useState({
      lastIndex: 0,
      currentIndex: initialIndex
    });

    const nextBtnClick = () => {
      let ci = (paging.currentIndex >= paging.lastIndex) ? paging.lastIndex : (paging.currentIndex+1);
       setPagingState({...paging, currentIndex: ci});
     };

     const prevBtnClick = () => {
      let ci = paging.currentIndex <= 0 ? 0 : (paging.currentIndex-1);
      setPagingState({...paging, currentIndex: ci});
    }

  React.useEffect(() => {
    let li = 0;
    li = (totalRecord % recordPerPage == 0) ?  totalRecord / recordPerPage : li = ((totalRecord / recordPerPage) + 1);
    setPagingState({...paging, lastIndex: (Math.floor(li) - 1), initialIndex:0, currentIndex: 0});

  }, [totalRecord, recordPerPage]);


  React.useEffect(() => {
    onPageChange(paging.currentIndex );
  },[paging.currentIndex])


  return (
    <div>
      {props.children}
      { (totalRecord > recordPerPage) ?
      <div
        className={clsx(classes.paging, className)}
        {...other}
      >
        <div onClick={nextBtnClick} className={clsx(classes.next, paging.lastIndex !== paging.currentIndex ? classes.enabled : classes.disabled, 'next')}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
        <div onClick={prevBtnClick} className={clsx(classes.prev, paging.currentIndex !== 0 ? classes.enabled : classes.disabled, 'prev')}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </div>
      </div>
      : ''}
    </div>
  );
};

Paging.propTypes = {
  className: PropTypes.string,
  totalRecord: PropTypes.number,
  recordPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  initialIndex: PropTypes.number
};
export default Paging;