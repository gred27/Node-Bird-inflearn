const express = require('express');
const { User } = require('../models');
const { noExtendLeft } = require('sequelize/types/lib/operators');

const router = express.Router();

// 응답 두번 보내면 에러
router.post('/', async (req, res, next) => {
    try {
        // 같은 아이디 있는지 조회
        const existUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (existUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.send('ok');
        res.json();
    } catch (error) {
        console.log(error);
        next(error); // status 500
    }
});

module.exports = router;
