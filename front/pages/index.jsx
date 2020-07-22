import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loginAction, logoutAction } from '../reducers/user';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  // redux state hook으로 가져오기
  // 렌더링 되는것 확인하면서 성능 최적화를 위해 잘게 쪼개기
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  console.log('user', me);
  console.log('post', mainPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return <PostCard key={c.id} post={c} />;
      })}
    </AppLayout>
  );
};

export default Home;
