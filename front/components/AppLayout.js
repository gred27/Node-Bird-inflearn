import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Card, Avatar } from "antd";
import LoginForm from "./LoginForm";

const dummy = {
    nickname: "gred",
    Post: [],
    Fllowings: [],
    Fllowers: [],
};

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item key='home'>
                    <Link href='/'>
                        <a>노드버드</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key='profile'>
                    <Link href='/profile'>
                        <a>프로필</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key='mail'>
                    <Input.Search enterButton style={{ verticalAlign: "middle" }}></Input.Search>
                </Menu.Item>
            </Menu>
            <Row gutter={10}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn ? (
                        <Card
                            actions={[
                                <div key='twit'>
                                    쨱짹
                                    <br />
                                    {dummy.Post.length}
                                </div>,
                                <div key='twit'>
                                    팔로잉
                                    <br />
                                    {dummy.Fllowings.length}
                                </div>,
                                <div key='twit'>
                                    팔로워
                                    <br />
                                    {dummy.Fllowers.length}
                                </div>,
                            ]}>
                            <Card.Meta
                                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                                title={dummy.nickanme}
                            />
                        </Card>
                    ) : (
                        <LoginForm />
                    )}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href=''>
                        <a target='_blank'>github. gred27</a>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};
export default AppLayout;
