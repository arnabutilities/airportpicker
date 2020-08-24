import React from 'react';

const RoleContext = React.createContext({
    loginTime: 0,
    username: '',
    role: ''
});

export default RoleContext;