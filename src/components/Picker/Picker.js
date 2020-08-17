import * as React from 'react';
import clsx from 'clsx';
import classes from './picker.css';
import defaultClasses from '../default/default.css';
import Paging from '../Paging/Paging';
import Card from '../Card';
import Search from '../Search';
import Items from '../Items';
import PropTypes from 'prop-types';


const Picker = (props) => {

  const [picker, setPickerState] = React.useState({
    data: [],
    selections: [],
    showCard: false,
    showLoading: true
  });

  const pickerElementRef = React.useRef(null);  

  const { 
    // callback to fetch data on search key entry
    getSearchableData,

    // picker default visibility option
    setVisibility,
    
    // callback on selecting any item
    onSelection,
    
    // callback incase need to perform any action on show the picker
    onShow,
    
    // callback incase need to perform any action on hide the picker
    onHide,
    
    // supplied class name
    className,

    // set initial data
    initialData,
    
    // handel additional parameters
    ...other } = props;


  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [picker]);

   React.useEffect(() => {
     setPickerState({...picker, data:initialData, showLoading: initialData.length > 0 ? false : true});
   },[initialData]);

  React.useEffect(() => {
    setPickerState({...picker, showCard:setVisibility});
  },[setVisibility]);

  React.useEffect(() => {
    if(picker.showCard && onShow){
      onShow(picker);
    }
    if(!picker.showCard && onHide){
      onHide(picker);
    }
   
  },[picker.showCard]);

  React.useEffect(() => {
    onSelection(picker.selections);
  },[picker.selections]);

  const toggleCard = () => {
    setPickerState({...picker, showCard:!picker.showCard});
  }

  const handleClickOutside = (event) => {
    if (pickerElementRef && !pickerElementRef.current.contains(event.target)) {
      setPickerState({...picker, showCard:false});
    }
  }

  const handelSearch = (event) => {
    setPickerState({...picker, showLoading:true});
    getSearchableData(event).then((setData) => {
      setPickerState({...picker, data:setData, showLoading:false});
    });

  }
  const resetSearch = () => {
    setPickerState({...picker, data:[]});
  }

  const changeSelection = (item, selection) => {
    let selectionList = picker.selections.concat([]);
    if(!selection) selectionList = selectionList.filter(e => e.code!==item.code);
    else
    selectionList.push(item);
    setPickerState({...picker, selections:selectionList});
  }

  const clearSelection = () => {
      setPickerState({...picker, selections: []});
  }

  return (<div
    className={clsx(classes.picker)}
    ref = {pickerElementRef} >
    <button
      className={clsx(defaultClasses.button, classes.button)}
      key='trigger_selector' onClick={toggleCard}> Click Here </button>

    <Card key='selector'
      className={clsx(classes.selectorPanel, picker.showCard ? classes.showCard : classes.hideCard)}
      {...other}
    >
      <Search 
        onSearch={handelSearch} 
        onReset={resetSearch} 
        totalSelection={picker.selections} 
        onClearSelection={clearSelection} 
        totalRecords={picker.data.length} 
        className={clsx(classes.search)}/>
        
      <div className={clsx(classes.loader, picker.showLoading ? classes.loaderShow : classes.loaderHide)}>Loading...</div>
      {/* <div className={clsx(classes.loader, picker.data.length == 0 ? classes.loaderShow : classes.loaderHide)}>Please provide a valid airport or city name.</div> */}
      <Items itemList={picker.data} selectedItems={picker.selections} onChangeSelection={changeSelection} className={clsx(classes.items)}></Items>
    </Card>
  </div>);
};
Picker.propTypes = {
  onSelection: PropTypes.func,
  onSearch: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  className: PropTypes.string,
  getSearchableData: PropTypes.func,
  setVisibility: PropTypes.bool
};
export default Picker;