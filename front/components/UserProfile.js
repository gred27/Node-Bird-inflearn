import React from "react";
import { Avatar, Card } from "antd";
import { useSelector } from "react-redux";
const UserProfile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <Card
            actions={[
                <div key='twit'>
                    쨱짹
                    <br />
                    {user.Post.length}
                </div>,
                <div key='twit'>
                    팔로잉
                    <br />
                    {user.Fllowings.length}
                </div>,
                <div key='twit'>
                    팔로워
                    <br />
                    {user.Fllowers.length}
                </div>,
            ]}>
            <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickanme} />
        </Card>
    );
};

export default UserProfile;
