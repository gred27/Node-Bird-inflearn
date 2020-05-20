import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.2/antd.compact.min.css'></link>
            </Head>
            <AppLayout>
                <div>내 프로필</div>
            </AppLayout>
        </>
    );
};

export default Profile;
