//  next 공통 레이아웃
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";

// prop 검증 ->  prop-types 사용
// Typescript 쓰면 쓸일 없음.
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.2/antd.compact.min.css'></link>
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
};

export default NodeBird;
