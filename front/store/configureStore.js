import { createWrapper } from 'next-redux-wrapper';
import {createStore} from 'redux';

const configureStore = () => {
    const enhancer;
}

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV,
})