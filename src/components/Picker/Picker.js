import * as React from 'react';
import clsx from 'clsx';
import classes from './picker.css';
import defaultClasses from '../default/default.css';
import Paging from '../Paging/Paging';
import Card from '../Card';
import Search from '../Search';
import Items from '../Items';
import PropTypes from 'prop-types';

/**
 * 
 * @param {React.props} props are supplied attributes from parent object. for Picker component supplied properties are initial state and event Callbacks.
 * ### Callbacks
 * ```
 * onShow(): this callback executes when picker component becomes visible
 * onHide(): this callback executes when picker component becomes hidden
 * onSearch() : this callback executes on keyup of search input
 * onSelections() : this callback executes once we select/deselect any item from search result 
 * ```
 * ### Initial values
 * ```
 *  initialData:[Object] searchable initialData, this data should be provided in order to perform search.
 *  setVisibility:boolean this field value will show or hide picker component (true: show, false:hide [default]) 
 * 
 * ```
 * Picker is a dumb component and should not not contain any business logic. 
 */
const Picker = (props) => {

  const [picker, setPickerState] = React.useState({
    data: [],
    selections: [],
    showCard: false,
    showLoading: true,
    searchKey: ''
  });

  const pickerElementRef = React.useRef(null);  

  const { 
    // callback to fetch data on search key entry
    onSearch,

    // picker default visibility option
    setVisibility=false,
    
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
    let searchedData = onSearch(event);
    let { value } = event.target;
    setPickerState({...picker, data:searchedData, searchKey: value, showLoading:false});
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

  return (<div className={clsx(classes.picker)} ref = {pickerElementRef} >
    <button key='trigger_selector' onClick={toggleCard} className={clsx(defaultClasses.button, classes.button)}>
      Click Here
    </button>
    { picker.showCard ? 
        <Card key='selector' className={clsx(classes.selectorPanel, classes.showCard)}  {...other}>
          <Search 
            onSearch={handelSearch}
            onReset={resetSearch}
            onClearSelection={clearSelection}
            totalSelection={picker.selections}
            totalRecords={picker.data.length} 
            initialValue={picker.searchKey} 
            className={clsx(classes.search)}/>
          { picker.showLoading ? 
            <div className={clsx(classes.loader,classes.loaderShow)}>Loading...</div> 
            : '' }
          <Items itemList={picker.data} selectedItems={picker.selections} onChangeSelection={changeSelection} className={clsx(classes.items)}/>
        </Card> 
      : '' }
  </div>);
};

// setting up types
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