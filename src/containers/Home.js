import React, { Component, useState, useEffect } from 'react';
import Picker from '../components/Picker/Picker';
import classes from './home.css';
import clsx from 'clsx';

const Home = (props) => {
    
    const [home, setHomeState] = useState({
        data:[],
        selections:[],
        refreshData: true
    });
    let dataSearch;



    useEffect(() => {
        // API Calls goes here    
        // fetch("/airports.json").then((res) => res.json()).then((respData) => {
        //     setTimeout(() => {
        //         console.log("data fetched");
        //         setHomeState({...home, data: [...respData]});
        //     }, 1000);
        //  });
    }, []);

    const getSearchableData = event => {
        event.persist();
        const {value} = event.target;
        dataSearch = new Promise((resolve, reject) => {
            if(home.refreshData) {
                fetch("/airports.json").then((res) => res.json()).then((respData) => {
                    setTimeout(() => {
                        console.log("data fetched");
                        setHomeState({...home, data: [...respData], refreshData:false});
                        let data = respData.filter((data) => data.name.indexOf(value) != -1  || data.city.indexOf(value) != -1);
                        if(event.target)
                        resolve(data);
                        else
                        reject({error: "Event not specified"});
                    }, 1000);
                 });
            } else {
                let data = home.data.filter((data) => data.name.indexOf(value) != -1  || data.city.indexOf(value) != -1);
                setTimeout(() => {
                    if(event.target)
                    resolve(data);
                    else
                    reject({error: "Event not specified"});
                },0);
            }
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
