import React, { Component, useState, useEffect } from 'react';
import Picker from '../components/Picker/Picker';
import classes from './home.css';
import clsx from 'clsx';

const Home = (props) => {
    
    const [home, setHomeState] = useState({
        data:[],
        selections:[],
        refreshData: false
    });
    let dataSearch;
    let dataRefreshed = false;


    useEffect(() => {
        // API Calls goes here    
        fetch("/airports.json").then((res) => res.json()).then((respData) => {
            setTimeout(() => {
                dataRefreshed = true;
                console.log("data fetched");
                setHomeState({...home, data: [...respData]});
            }, 5000);
         });
    }, [home.refreshData]);

    const getSearchableData = event => {
        event.persist();
        const {value} = event.target;
        if(home.refreshData) {
            setHomeState({...home, refreshData:true});
        }
        dataSearch = new Promise((resolve, reject) => {
            let data = home.data.filter((data) => data.name.indexOf(value) != -1 );
            setTimeout(() => {
                if(event.target)
                resolve(data);
                else
                reject({error: "Event not specified"});
            },0);

        });
        return dataSearch;
    }

    
    return (         
            <Picker
            onShow = {(state) => { console.log('show triggered')}}
            onHide = {(state) => { console.log('hide triggered')}}
            setVisibility = {true}
            onSelection = {(selections) => { console.log(selections)}}
            getSearchableData = {getSearchableData}
            className={clsx(classes.picker)}/>
    );
}

export default Home;