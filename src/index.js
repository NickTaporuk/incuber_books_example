import React from 'react';
import { render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {orange500, deepOrange500} from 'material-ui/styles/colors'

import Dashboard from './containers/Dashboard';
import IndexPage from './components/pages/IndexPage';
import NotFoundPage from './components/pages/NotFoundPage';

import registerServiceWorker from './registerServiceWorker';
import './index.css'

injectTapEventPlugin();
const muiTheme = getMuiTheme({
    palette: {
        primary1Color : deepOrange500,
        accent1Color  : orange500
    }
});

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
);


render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={ store }>
            <Router>
                    <Switch>
                        <Route exact path="/" component={Dashboard(IndexPage)}/>
                        <Route path="*" component={Dashboard(NotFoundPage)}/>
                    </Switch>
            </Router>
        </Provider>
    </MuiThemeProvider>,

    document.getElementById('root')
);
registerServiceWorker();
