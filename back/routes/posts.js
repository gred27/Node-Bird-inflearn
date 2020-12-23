const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');
const user = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }
        const posts = await Post.findAll({
            where,
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
