import React from "react";
import { Input, Form, Button, List, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
    return (
        <>
            <NicknameEditForm />
            <List
                style={{ marginBottom: "20px" }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size='small'
                header={<div>Follower List</div>}
                loadMore={<Button style={{ width: "100%" }}>MORE</Button>}
                dataSource={["Gred", "Fool", "NodeBird"]}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: "20px" }}>
                        {/* 배열 안의 jsx 쓸때는 무조건 키를 작성. 배열쓴다는건 반복문 쓴다는 뜻이므로. */}
                        <Card actions={[<StopOutlined key='stop' />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}></List>
            <List
                style={{ marginBottom: "20px" }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size='small'
                header={<div>Following List</div>}
                loadMore={<Button style={{ width: "100%" }}>MORE</Button>}
                dataSource={["Gred", "Fool", "NodeBird"]}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: "20px" }}>
                        <Card actions={[<StopOutlined key='stop' />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}></List>
        </>
    );
};

export default Profile;
