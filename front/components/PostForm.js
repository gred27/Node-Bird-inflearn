import React from "react";
import { Form, Input, Button } from "antd";
import { dummy } from "../constant/dummy";

const PostForm = () => {
    return (
        <Form style={{ margin: "10px 0 20px" }} encType='multipart/form-data'>
            <Input.TextArea maxLength={140} placeholder='Have a Good Day?'></Input.TextArea>
            <div>
                <input type='file' multiple hidden></input>
                <Button>Image Upload</Button>
                <Button type='primary' style={{ float: "right" }} htmlType='submit'>
                    끅끅
                </Button>
            </div>
            <div>
                {dummy.imagePaths.map((v, i) => {
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
