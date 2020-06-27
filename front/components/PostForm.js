import React, { useCallback, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    });

    const onSubmit = useCallback(() => {
        dispatch(ADD_POST_REQUEST);
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Form style={{ margin: "10px 0 20px" }} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder='Have a Good Day?'></Input.TextArea>
            <div>
                <input type='file' multiple hidden ref={imageInput}></input>
                <Button onClick={onClickImageUpload}>Image Upload</Button>
                <Button type='primary' style={{ float: "right" }} htmlType='submit'>
                    끅끅
                </Button>
            </div>
            <div>
                {imagePaths.map((v, i) => {
                    return (
                        <div key={v} style={{ display: "inline-block" }}>
                            <img
                                src={"http://localhost:3000/" + v}
                                style={{ width: 200, height: 200 }}
                                alt={v}
                            />
                            <div>
                                <Button>delete</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Form>
    );
};

export default PostForm;
