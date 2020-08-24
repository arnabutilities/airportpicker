import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Documentation from './containers/Documentation';
import Home from './containers/Home';
import classes from './index.css';
import clsx from 'clsx';
import DropdownOpt2 from './containers/dropdown-opt-2';


class App extends Component {
    render () {
        return (
            <div className={clsx(classes.container, 'default')}>
                <div className={clsx(classes.primaryNav)}>
                    <Link to="/">Option 1</Link> |
                    <Link to="/opt-2">Option 2</Link> |
                    <Link to="/doc">Documentation</Link>
                </div>
                <div className={clsx(classes.playground)}>
                    <Route path="/" exact component={Home} />
                    <Route path="/opt-2" exact component={DropdownOpt2} />
                    <Route path="/doc" component={Documentation} />
                </div>
            </div>
        );
    }
}

export default App;