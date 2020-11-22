const express = require('express');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();

// login 전략 실행 + 미들웨어 확장 (req, res, next) 사용하기
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async loginErr => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user);
        });
    })(req, res, next);
});

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
