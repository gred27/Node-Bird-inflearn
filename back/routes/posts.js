const express = require('express');

const { Post, User, Image, Comment } = require('../models');
const user = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log(req.query);
    try {
        const posts = await Post.findAll({
            where: { id: req.query.lastId },
            limit: 10, // 10개만 가져오기

            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ], // 내림차순
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname'],
                },
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
                    model: User,
                    as: 'Likers',
                    attributes: ['id'],
                },
            ],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error();
        next(error);
    }
});

module.exports = router;
