import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import { signUpAction } from '../reducers/user';

const TextInput = ({ value }) => <div>{value}</div>;

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
};

const Signup = () => {
  // const [email, setemail] = useState("");
  // const [nick, setNick] = useState("");
  // const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const { signupLoading, signUpDone, signUpError, me } = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  });
  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      // eslint-disable-next-line no-alert
      alert(signUpError);
    }
  }, [signUpError]);

  const onSubmit = useCallback(
    e => {
      console.log({
        email,
        nickname,
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
          email,
          password,
          nickname,
        }),
      );
    },
    [password, passwordCheck, term],
  );

  // const onChangeEmail = (e) => {
  //     setemail(e.target.value);
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
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            required
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            required
            value={nickname}
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-pass">비밀번호</label>
          <br />
          <Input
            name="user-pass"
            type="password"
            required
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-pass-chk">비밀번호 체크</label>
          <br />
          <Input
            name="user-pass-chk"
            type="password"
            required
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            AGREE?
          </Checkbox>
          {termError && (
            <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
