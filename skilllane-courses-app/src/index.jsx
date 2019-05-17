import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { App } from './App';
import reducers from './reducers';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

const store = createStore( reducers, applyMiddleware(reduxThunk));

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('app')
);