import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import Axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  // redux state hook으로 가져오기
  // 렌더링 되는것 확인하면서 성능 최적화를 위해 잘게 쪼개기
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    state => state.post,
  );
  console.log('user', me);
  console.log('mainPosts', mainPosts);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]
            ? mainPosts[mainPosts.length - 1].id
            : 0;
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    // useEffect에서 이벤트 리스너 달면, 꼭 리턴할때 해재해줘야함
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c.id} post={c} />;
      })}
    </AppLayout>
  );
};

// 상황에 따라서 데이터가 바뀌어야하면
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  Axios.defaults.headers.Cookie = cookie;
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default Home;
