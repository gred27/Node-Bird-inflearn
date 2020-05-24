//  next 공통 레이아웃
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

import AppLayout from "../components/AppLayout";
import reducer from "../reducers";

// prop 검증 ->  prop-types 사용
// Typescript 쓰면 쓸일 없음.
const NodeBird = ({ Component, store }) => {
    // store는 state, action, reducer가 합쳐진 것
    // next에 redux를 적용하려면 next-redux-wrapper를 설치해야함
    //
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>NodeBird</title>
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.2/antd.compact.min.css'></link>
                </Head>
                <AppLayout>
                    <Component />
                </AppLayout>
            </Provider>
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
};

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares),
        typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
    );
    const store = createStore(reducer, initialState, enhancer);

    return store;
})(NodeBird);
