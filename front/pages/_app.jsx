//  next 공통 레이아웃
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';

// import rootSaga from "../sagas";

// prop 검증 ->  prop-types 사용
// Typescript 쓰면 쓸일 없음.
const NodeBird = ({ Component }) => {
  // store는 state, action, reducer가 합쳐진 것
  // next에 redux를 적용하려면 next-redux-wrapper를 설치해야함
  //
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.2/antd.compact.min.css'
        />
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
