import * as React from 'react';
import classes from './items.css';
import clsx from 'clsx';
import Item from '../Item/Item';
import Paging from '../Paging/Paging';

const Items = (props) => {
  const { itemList = {}, selectedItems = [], onChangeSelection, className,  ...other } = props;
  const [items, setItemsState] = React.useState({elements:[],selectedIds:[]});
  const pageSize = 9;

  React.useEffect(() => {
    setItemsState({...items, elements: itemList.slice(0,pageSize)});
  },[itemList]);

  const triggerChange = (currentIndex) => {
    let pagingPos = currentIndex * pageSize;
    setItemsState({...items, elements: itemList.slice(pagingPos, pagingPos + pageSize)});
  }

  const changeSelection = (data,isSelected) => {
    onChangeSelection(data,isSelected);
  }

  const checkSelected = (element) => {
    return selectedItems.filter((item) => item.code === element.code).length > 0;
  }

  return (
    <Paging
      totalRecord={itemList.length}
      recordPerPage={pageSize}
      initialIndex={0}
      onPageChange={triggerChange}
      className={clsx(classes.paging)}>
      {itemList.length > 0 ? <div 
        className={clsx(classes.items, classes.borderTop, className)} {...other}>
          {
              items.elements.map((element, index) => {
                return <Item  key={element.code} 
                              onToggle={changeSelection} 
                              selected={checkSelected(element)} 
                              data={element} 
                              className={clsx(classes.itemsElement, element.code)}
                              {...other} />
              })
          }
      </div> : ''}
    </Paging>
  );
}

export default Items;