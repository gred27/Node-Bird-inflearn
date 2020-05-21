import React from "react";
import { Input, Form, Button, List, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
const Profile = () => {
    return (
        <>
            <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}>
                <Input addonBefore='nickName'></Input>
                <Button type='primary'>Edit</Button>
                <List
                    style={{ marginBottom: "20px" }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size='small'
                    header={<div>Follower List</div>}
                    loadMore={<Button style={{ width: "100%" }}>MORE</Button>}
                    dataSource={["Gred", "Fool", "NodeBird"]}
                    renderItem={(item) => (
                        <List.Item style={{ marginTop: "20px" }}>
                            <Card actions={[<StopOutlined />]}>
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
                            <Card actions={[<StopOutlined />]}>
                                <Card.Meta description={item} />
                            </Card>
                        </List.Item>
                    )}></List>
            </Form>
        </>
    );
};

export default Profile;
