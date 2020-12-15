const express = require('express');
const { Post, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                        },
                    ],
                },
                {
                    model: User, // 게시글 성자
                    attributes: ['id', 'nickname'],
                },
                {
                    model: User, // 좋아요 누른 사람
                    as: 'Likers',
                    attributes: ['id'],
                },
            ],
        });
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// :이후에 들어가는건 params
router.post('/:postId/commnet', isLoggedIn, async (req, res, next) => {
    try {
        // 게시글 확인
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });

        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname'],
                },
            ],
        });
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:postId/like', isLoggedIn, async (req, res) => {
    //DELETE /post/1/like

    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시물이 존재하지 않습ㄴ디ㅏ.');
        }
        await post.addLikers(req.user.id);
        return res.status(202).json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postId/unlike', isLoggedIn, async (req, res, next) => {
    //DELETE /post/1/unlike
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시물이 존재하지 않습ㄴ디ㅏ.');
        }
        await post.removeLikers(req.user.id);
        return res.status(202).json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postId/', isLoggedIn, async (req, res, next) => {
    //DELETE /post/1/
    try {
        await Post.destroy({
            where: { id: req.params.postId, UserId: req.user.id },
        });
        res.json({ PostId: req.params.postId });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
