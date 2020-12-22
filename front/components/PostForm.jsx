import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading } = useSelector(
    state => state.post,
  );
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();

  useEffect(() => {
    console.log('_postForm', addPostDone);
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeText = useCallback(e => {
    console.log(e.target.value);
    setText(e.target.value);
    console.log('text', text);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmitForm = useCallback(() => {
    console.log('text1', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text,
      },
    });
  }, [text]);

  const onChangeImages = useCallback(e => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmitForm}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="Have a Good Day?"
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={addPostLoading}
        >
          끅끅
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3000/${v}`}
              style={{ width: 200, height: 200 }}
              alt={v}
            />
            <div>
              <Button>delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
