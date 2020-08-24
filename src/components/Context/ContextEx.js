import React, { useState } from 'react';
import RoleContext from './RoleContext';

const ContextEx = (props) => {

    const [context, contextStateUpdate] = useState({role:'check'});

    return (
        <RoleContext.Provider value={
            {
                loginTime: (new Date()).getTime(),
                username: 'arnab',
                role: context.role
            }
        }>
            <ContextChildLevelOne/>
        </RoleContext.Provider>
    )
}

const ContextChildLevelOne = (props) => {
    return (
        <ContextChildLevelTwo/>
    )
}

const ContextChildLevelTwo = (props) => {
    return (
        <ContextChildLevelThree/>
    )
}

const ContextChildLevelThree = (props) => {
    return (
        <RoleContext.Consumer>
        {context => <div>
            <ul>
                <li>{context.role}</li>
            </ul>
        </div> }
        </RoleContext.Consumer>
    )
};

export default ContextEx;