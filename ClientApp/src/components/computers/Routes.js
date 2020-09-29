import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { New } from './New'
import { Index } from './Index'

export default class Routes extends Component {

    render() {
        return (
            <Fragment>
                <Route exact path="/computers/" component={Index} />
                <Route path="/computers/new" component={New} />
            </Fragment>
        );
    }
}