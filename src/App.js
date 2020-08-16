import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Documentation from './containers/Documentation';
import Home from './containers/Home';
import classes from './index.css';
import clsx from 'clsx';


class App extends Component {
    render () {
        return (
            <div className={clsx(classes.container, 'default')}>
                <div className={clsx(classes.primaryNav)}>
                    <Link to="/">Home</Link> |
                    <Link to="/doc">Documentation</Link>
                </div>
                <div className={clsx(classes.playground)}>
                    <Route path="/" exact component={Home} />
                    <Route path="/doc" component={Documentation} />
                </div>
            </div>
        );
    }
}

export default App;