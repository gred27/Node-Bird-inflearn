import React from "react";
import { Card, Avatar } from "antd";
import PropTypes from "prop-types";
import {
    RetweetOutlined,
    HeartOutlined,
    EllipsisOutlined,
    MessageOutlined,
} from "@ant-design/icons";

const PostCard = ({ post }) => {
    console.log(post);
    return (
        <Card
            key={+post.createdAt}
            cover={
                post.img && <img alt='example' src={post.img} style={{ width: 200, height: 200 }} />
            }
            actions={[
                <RetweetOutlined key='retweet' />,
                <HeartOutlined key='heart' />,
                <MessageOutlined key='message' />,
                <EllipsisOutlined key='ellipsis' />,
            ]}
            extra={""}>
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
    );
};
PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};
export default PostCard;
