import React, { Component, useState, useEffect } from 'react';
import Picker from '../components/Picker/Picker';
import classes from './home.css';
import clsx from 'clsx';

/**
 * 
 * @param {React.props} props are supplied attributes from parent object. for home component there will be no supplied properties.
 * Home component is a container type of component as it is aware of application state.
 * business logic should be present in container. 
 */
const Home = (props) => {

    const [home, setHomeState] = useState({
        data: [],
        selections: [],
        refreshData: true,
        searchKey: ""
    });

    /**
     * This callback function is for setting up search logic.
     * @param {React.SyntheticEvent event:React.SyntheticEvent} event Callback on searchInputField key up.
     * @returns Array of searched elements
     */
    const getSearchedData = event => {
        event.persist();
        const { value } = event.target;
        let data = home.data.filter((data) => data.name.toLowerCase().indexOf(value) == 0 || data.city.toLowerCase().indexOf(value) == 0);
        return data;
    }

    /**
     * This callback will be called once picker component is visible.
     * @param {Object} state of the Picker component will be available to this handler
     * state object will have below format
     * ```
     * state = {
     *     data: [],
     *     selections: [],
     *     showCard: false,
     *     showLoading: true
     *   }
     * ```
     * @returns void
     */
    const showHandler = (state) => { 
        console.log("[onShow]:",state);
        // load data after first show
        if (home.refreshData) {
            fetch("/airports.json").then((res) => res.json()).then((respData) => {
                setTimeout(() => { // Timeout is not required here, it is implemented to simulate a delay
                    setHomeState({...home, data: [...respData], refreshData: false }); 
                }, 500);
            });
        }
    }

    /**
     * This callback will be called once picker component visibility changes to hidden.
     * @param {Object} state of the Picker component will be available to this handler
     * state object will have below format
     * ```
     * state = {
     *     data: [],
     *     selections: [],
     *     showCard: false,
     *     showLoading: true
     *   }
     * ```
     * @returns void
     */    
    const hideHandler = (state) => {
        // on hide no activity is happening
        console.log("[onHide]:", state)
    }

    /**
     * This callback will be called once any item is selected from picker component.
     * @param {Object} updatedList is Array of selected Objects from picker component
     * updatedList object will have below format
     * ```
     * updatedList = [{
     *      name: <NAME>,
     *      code: <CODE>,
     *      city: <CITY>,
     *   }, ...]
     * ```
     * @returns void
     */    
    const itemSelectionHandler = (updatedList) => {
        // on selection of any item no activity is happening
        console.log("[onSelection]:",updatedList)
    }

    /**
     * This callback executes every time, state object ```{home}``` gets updated.
     */
    const renderInitialData = () => home.data.filter((data, index)=>{
        if(data.name.toLowerCase().indexOf(home.searchKey) == 0 || data.city.toLowerCase().indexOf(home.searchKey) == 0){
            return data;
        }
        return false;
    });


    return (
        <Picker
            onShow={showHandler}
            onHide={hideHandler}
            onSearch={getSearchedData}
            onSelection={itemSelectionHandler}
            initialData={renderInitialData()}
            setVisibility={false}
            className={clsx(classes.picker)} />
    );
}

export default Home;
