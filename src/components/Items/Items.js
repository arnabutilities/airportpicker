import * as React from 'react';
import classes from './items.css';
import clsx from 'clsx';
import Item from '../Item/Item';
import Paging from '../Paging/Paging';

const Items = (props) => {
  const { itemList, selectedItems, onChangeSelection, className,  ...other } = props;
  const [items, setItemsState] = React.useState([]);
  let pageSize = 9;

  React.useEffect(() => {
    setItemsState(itemList.slice(0,pageSize));
  },[itemList]);

  const triggerChange = (currentIndex) => {
    console.log(currentIndex);
    let pagingPos = currentIndex * pageSize;
    setItemsState(itemList.slice(pagingPos, pagingPos + pageSize));
    console.log(itemList.length, items.length, pagingPos,  pagingPos + pageSize )
  }

  const setForSelection = (data,selection) => {
    onChangeSelection(data,selection);
  }

  return (
    <Paging
      totalRecord={itemList.length}
      recordPerPage={pageSize}
      initialIndex={0}
      onPageChange={triggerChange}
      className={clsx(classes.paging)}>
      <div 
        className={clsx(classes.items, className)}
        {...other}>
          {
              items.map((element, index) => {
                selectedItems.filter((e)=>element.code === e.code).length 
                return <Item key={element.code} onSelect={setForSelection} selected={selectedItems.filter((e)=>element.code === e.code).length > 0} data={element} className={clsx(classes.itemsElement)}
                {...other} > some item </Item>
              })
          }
      </div>
    </Paging>
  );
}

export default Items;