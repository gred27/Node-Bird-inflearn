import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import { css } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NickNameEditForm = () => {
  const { me } = useSelector(state => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  // Form은 리렌더링이 많이 일어 나기 때문에 따로 빼주는 것이 좋다.
  return (
    <Form css={css`marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px"`}>
      <Input nChange={onChangeNickname} addonBefore="닉네임" enterButton="수정" onSearch={onSubmit} />
    </Form>
  );
};

export default NickNameEditForm;
