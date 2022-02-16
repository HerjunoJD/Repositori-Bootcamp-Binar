import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducers from './reducers/index';

const makeStore = (context) => createStore(reducers);

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
