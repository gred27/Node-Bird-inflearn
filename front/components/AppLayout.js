import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Card, Avatar } from "antd";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const SerachInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.user);
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
                    <SerachInput enterButton></SerachInput>
                </Menu.Item>
            </Menu>
            <Row gutter={10}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
