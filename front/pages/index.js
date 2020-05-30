import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostFrom from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loginAction, logoutAction } from "../reducers/user";

const Home = () => {
    // redux state hook으로 가져오기
    const { isLoggedIn, user } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    console.log("user", user);
    console.log("post", mainPosts);

    return (
        <>
            <div>
                {user ? <div>로그인 했습니다 : {user.nickname}</div> : <div>로그아웃</div>}
                {isLoggedIn && <PostFrom />}
                {mainPosts.map((c) => {
                    return <PostCard key={c} post={c} />;
                })}
            </div>
        </>
    );
};

export default Home;
