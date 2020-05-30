import React from "react";
import { Form, Input, Button } from "antd";

const NickNameEditFrom = () => {
    // Form은 리렌더링이 많이 일어 나기 때문에 따로 빼주는 것이 좋다.
    return (
        <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}>
            <Input addonBefore='nickName'></Input>
            <Button type='primary'>Edit</Button>
        </Form>
    );
};

export default NickNameEditFrom;