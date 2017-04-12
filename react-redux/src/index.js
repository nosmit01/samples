import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Order from './components/Order';
import configurator from './utils/Reducers';

import './index.css';

const store = createStore(configurator);

const redirect = (nextState, replace) => {
  replace({
    pathname: '/',

    state: {
      nextPathname: nextState.location.pathname,
    },
  });
};

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Order} />
        <Route path="*" onEnter={redirect} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
