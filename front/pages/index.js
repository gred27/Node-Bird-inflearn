import React from "react";
import PostFrom from "../components/PostForm";
import PostCard from "../components/PostCard";
import { dummy } from "../constant/dummy";

const Home = () => {
    console.log(dummy);
    return (
        <>
            <div>
                {dummy.isLoggedIn && <PostFrom />}
                {dummy.mainPosts.map((c) => {
                    return <PostCard key={c} post={c} />;
                })}
            </div>
        </>
    );
};

export default Home;
