import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const { me, logOutLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          쨱짹
          <br />
          {me?.Post?.length}
        </div>,
        <div key="twit">
          팔로잉
          <br />
          {me?.Followings?.length}
        </div>,
        <div key="twit">
          팔로워
          <br />
          {me?.Followers?.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title={me?.nickanme} />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
