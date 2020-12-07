import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_USER_REQUEST, FOLLOW_USER_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    state => state.user,
  );
  const isFollowing =
    me && me.Following && me.Following.find(v => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatchEvent({
        type: UNFOLLOW_USER_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({ type: FOLLOW_USER_REQUEST, data: post.User.id });
    }
  }, [isFollowing]);
  return (
    <Button
      loading={followLoading || unfollowLoading}
      onClickButton={onClickButton}
    >
      {isFollowing ? 'unFollow' : 'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape.isRequired,
};

export default FollowButton;
