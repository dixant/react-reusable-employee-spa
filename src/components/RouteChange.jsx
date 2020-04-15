import React from 'react';
import {useHistory, Redirect} from 'react-router-dom';

const RouteChange = (path) => {

    // let history = useHistory();
    // history.push(path);
    window.location.pathname = path;
}

export default RouteChange;