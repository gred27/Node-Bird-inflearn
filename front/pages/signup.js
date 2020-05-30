import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Form, Input, Checkbox, Button } from "antd";
import { signUpAction } from "../reducers/user";
import { useDispatch } from "react-redux";

const TextInput = ({ value }) => {
    return <div>{value}</div>;
};

TextInput.propTypes = {
    value: PropTypes.string,
};

// custom Hook 사용하면
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    });
    return [value, handler];
};

const Signup = () => {
    // const [id, setId] = useState("");
    // const [nick, setNick] = useState("");
    // const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [id, onChangeId] = useInput("");
    const [nick, onChangeNick] = useInput("");
    const [password, onChangePassword] = useInput("");

    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e) => {
            console.log({
                id,
                nick,
                password,
                passwordCheck,
                term,
            });

            if (password !== passwordCheck) {
                return setPasswordError(true);
            }

            if (!term) {
                return setTermError(true);
            }

            dispatch(
                signUpAction({
                    id,
                    password,
                    nick,
                })
            );
        },
        [password, passwordCheck, term]
    );

    // const onChangeId = (e) => {
    //     setId(e.target.value);
    // };
    // const onChangeNick = (e) => {
    //     setNick(e.target.value);
    // };
    // const onChangePassword = (e) => {
    //     setPassword(e.target.value);
    // };

    // useCallback 의 사용
    // 자식 컴포넌트에 전달하는 함수는 useCallback 사용
    // 계속 새로 렌더링 될 때마다(Signup 함수의 실행) 새로운 함수들이 생기기 때문에
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordError(e.target.value !== password);
            setPasswordCheck(e.target.value);
        },
        [password]
    );

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
        <>
            <Form onFinish={onSubmit} style={{ padding: 10 }}>
                <TextInput value={"135"}></TextInput>
                <div>
                    <label htmlFor='user-id'>아이디</label>
                    <br />
                    <Input name='user-id' required value={id} onChange={onChangeId}></Input>
                </div>
                <div>
                    <label htmlFor='user-nick'>닉네임</label>
                    <br />
                    <Input name='user-nick' required value={nick} onChange={onChangeNick}></Input>
                </div>
                <div>
                    <label htmlFor='user-pass'>비밀번호</label>
                    <br />
                    <Input
                        name='user-pass'
                        type='password'
                        required
                        value={password}
                        onChange={onChangePassword}></Input>
                </div>
                <div>
                    <label htmlFor='user-pass-chk'>비밀번호 체크</label>
                    <br />
                    <Input
                        name='user-pass-chk'
                        type='password'
                        required
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}></Input>
                    {passwordError && (
                        <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
                <div>
                    <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
                        AGREE?
                    </Checkbox>
                    {termError && <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type='primary' htmlType='submit'>
                        가입하기
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default Signup;
