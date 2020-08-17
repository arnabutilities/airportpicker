import React, { Component, useState, useEffect } from 'react';
import Picker from '../components/Picker/Picker';
import classes from './home.css';
import clsx from 'clsx';

const Home = (props) => {

    const [home, setHomeState] = useState({
        data: [],
        selections: [],
        refreshData: true,
        searchKey: ""
    });
    let dataSearch;

    const getSearchableData = event => {
        event.persist();
        const { value } = event.target;
        setHomeState({...home, searchKey: value });
        dataSearch = new Promise((resolve, reject) => {
            let data = home.data.filter((data) => data.name.indexOf(value) != -1 || data.city.indexOf(value) != -1);
            event.target ? resolve(data) : reject({ error: "Event not specified" });
        });
        return dataSearch;
    }

    useEffect(() => {
        console.log(home.searchKey);
    }, [home.searchKey]);


    return (
        <Picker
            onShow={(state) => { 
                console.log("[onShow]:",state.selections);
                if (home.refreshData) {
                    fetch("/airports.json").then((res) => res.json()).then((respData) => {
                        setTimeout(() => {
                            setHomeState({...home, data: [...respData], refreshData: false });
                        }, 500);
                    });
                }
            }}
            onHide={(state) => {
                console.log("[onHide]:", state.selections)
            }}
            setVisibility={false}
            onSelection={(updatedList) => {
                 //console.log("[onSelection]:",updatedList)
            }}
            initialData={home.data.filter((data, index)=>{
                
                if(data.name.indexOf(home.searchKey) != -1 || data.city.indexOf(home.searchKey) != -1){
                    return data;
                }
                return false;
            })}
            getSearchableData={getSearchableData}
            className={clsx(classes.picker)} />
    );
}

export default Home;
