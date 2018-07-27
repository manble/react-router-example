/**
* @description：
* @author: manble@live.com
* @created: 2017-12-23
*/

'use strict';

import { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const Topic = ({ match }) => <h3>{match.params.topicId}</h3>;

const Topics = ({ match }) => {
    return <div>
        <h2>Topics</h2>
        <ul>
            <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
            <li><Link to={`${match.url}/components`}>Components</Link></li>
            <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() =>
                <h3>Please select a topic.</h3>
            } />
    </div>
};

export default Topics;