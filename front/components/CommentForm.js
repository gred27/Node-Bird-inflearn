import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import React, { useCallback } from "react";

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.id);
    const [commentText, onChangeCommentText] = useInput("");

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button type='primary' htmlType='submit'>
                    Twit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CommentForm;
