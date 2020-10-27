// const http = require('http')
// const server = http.createServer((res,req)=> {
//     console.log(res.url,req.method);

//     // 마지막에만 쓰는 end
//     res.end('Hello Node');
// });

// server.listen(3065, () => {
//     console.log('server build')
// });

const express = require("express");
const postRouter = require("./routes/post");
const app = express();

/*
  app.get =>가져오기
  app.post => 생성
  app.put => 전체수정(잘 안씀)
  app.delete => 삭제 (잘안씀)
  app.patch => 부분만 수정 (게시글 수정 등)
  app.option
  app.head => head만 가져옴  
*/

/* api 문서는 swagger 자동생성*/

app.use("/post", postRouter);
app.get("/", (req, res) => {
    res.send("hello express");
});

app.listen(3065, () => {
    console.log("server start");
});

app.get("/api/posts", (req, res) => {
    res.json([
        { id: 1, content: "hello" },
        { id: 2, content: "hello1" },
        { id: 3, content: "hello2" },
    ]);
});