const express = require('express');
const { User } = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: Post,
                        attributes: ['id'],
                    },
                    {
                        model: User,
                        as: 'Follwings',
                        attributes: ['id'],
                    },
                    {
                        model: User,
                        as: 'Followers',
                        attributes: ['id'],
                    },
                ],
            });

            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
    }
});

// login 전략 실행 + 미들웨어 확장 (req, res, next) 사용하기
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(user);
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
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: Post,
                    },
                    {
                        model: User,
                        as: 'Follwings',
                    },
                    {
                        model: User,
                        as: 'Followers',
                    },
                ],
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
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
