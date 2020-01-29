import React from 'react';
import ReactDOM from 'react-dom';
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter,
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import configurateStore from './common/redux/store';
import { Provider } from 'react-redux';
import "./index.scss";

import Login from './components/login/Login';
import Register from './components/register/Register';

const store = configurateStore();

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route exact path={"/"}/>
            <Route exact path={"/login"} component={Login}/>
            <Route exact path={"/register"} component={Register} />
            <Redirect to={"/"}/>
        </Switch>
    </BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
