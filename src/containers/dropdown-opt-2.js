import React, { Component, useState, useEffect, useRef } from 'react';
import Picker from '../components/Picker/Picker';
import classes from './dropdown-opt-2.css';
import clsx from 'clsx';
import Dropdown from '../components/Dropdown/Dropdown';

const DropdownOpt2 = (props) => {

    const [home, setHomeState] = useState({
        data: [],
        selections: {},
        refreshData: true,
        searchKey: "",
        visible: false,
        update: (new Date()).getTime()
    });

    const cardRef = useRef(null);

    const fetchData = () => {
        setHomeState({ ...home, visible: !home.visible });
        if (home.data.length === 0) {
            fetch("/airports.json").then((res) => res.json()).then((res) => {
                setTimeout(() => {
                    setHomeState({ ...home, data: res, visible: !home.visible, update: (new Date()).getTime() });
                }, 0);
            });
        } else {
            setHomeState({ ...home, visible: !home.visible });
        }
    }

    useEffect(() => {
        let clickEventListener = document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [home])

    const handleClickOutside = (e) => {
        if (!cardRef?.current?.contains(e.target))
            hideMe(e);
    }

    const hideMe = (e) => {
        console.log(home);
        setHomeState({
            ...home,
            visible: false
        });
    };
    const processSelected = (selectedObject, list, type) => {
        setHomeState({ ...home, selections: list });
        console.log(list, type, selectedObject);
    };


    return (
        <div>
            <div className={clsx(classes.selections)} >
                {
                    home.selections ? <ul className={clsx(classes.selectedUl)}>
                        {
                            Object.keys(home.selections).map((element, index) => {
                                let v = home.selections[element];
                                return <li className={clsx(classes.selectedLi)} key={index}>{v.name}</li>
                            })
                        }
                    </ul> : ''
                }
            </div>
            <div ref={cardRef} className={clsx(classes.dropdown)} key="option2">
                <button key="option2-button" onClick={fetchData}> Click Here </button>
                {home.visible ? <div ><Dropdown
                    onSelection={processSelected}
                    initialData={home.data}
                    dataVersion={home.update}
                    selections={home.selections}
                /> </div> : ''}
            </div>
        </div>
    );
}

export default DropdownOpt2;
