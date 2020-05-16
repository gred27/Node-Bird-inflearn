import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.2/antd.compact.min.css'></link>
            </Head>
            <AppLayout>
                <div>회원가입</div>
            </AppLayout>
        </>
    );
};

export default Signup;
