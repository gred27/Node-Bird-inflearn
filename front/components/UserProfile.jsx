import React from 'react';
import { Avatar, Card, Button } from 'antd';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <Card
      actions={[
        <div key='twit'>
          쨱짹
          <br />
          {me.Post.length}
        </div>,
        <div key='twit'>
          팔로잉
          <br />
          {me.Fllowings.length}
        </div>,
        <div key='twit'>
          팔로워
          <br />
          {me.Fllowers.length}
        </div>,
      ]}>
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickanme} />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;