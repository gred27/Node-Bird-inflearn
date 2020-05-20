import React from "react";
import { Form, Input, Button, Card, Avatar } from "antd";
import {
    RetweetOutlined,
    HeartOutlined,
    EllipsisOutlined,
    MessageOutlined,
} from "@ant-design/icons";
const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [
        {
            User: {
                id: 1,
                nickname: "gred",
            },
            content: "first message",
            img: "/image/dummy_image.jpg",
        },
    ],
};

const Home = () => {
    return (
        <>
            <div>
                {dummy.isLoggedIn && (
                    <Form encType='multipart/form-data'>
                        <Input.TextArea
                            maxLength={140}
                            placeholder='Have a Good Day?'></Input.TextArea>
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
                                            style={{ width: "200px" }}
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
                )}
                {dummy.mainPosts.map((c) => {
                    return (
                        <Card
                            key={+c.createdAt}
                            cover={c.img && <img alt='example' src={c.img} />}
                            actions={[
                                <RetweetOutlined key='retweet' />,
                                <HeartOutlined key='heart' />,
                                <MessageOutlined key='message' />,
                                <EllipsisOutlined key='ellipsis' />,
                            ]}
                            extra={""}>
                            <Card.Meta
                                avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                                title={c.User.nickname}
                                description={c.content}
                            />
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
