/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useCallback } from 'react';
import { Card, Avatar, Popover, Button, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import {
  RetweetOutlined,
  HeartOutlined,
  EllipsisOutlined,
  MessageOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import PostImages from './PostImage';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const { me } = useSelector(state => state.user);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const id = me && me.id;

  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    <CardWrapper key={+post.createdAt}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#ff5b59"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>Edit</Button>
                    <Button type="danger">Delete</Button>
                  </>
                ) : (
                  <Button>Report</Button>
                )}
              </Button.Group>
            }
          />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        extra=""
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
    PostImages: PropTypes.array,
  }),
};
export default PostCard;
