const express = require('express');
const { User, Post } = require('../models');
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
                        as: 'Followings',
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

router.get('/:userId', async (req, res, next) => {
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.params.userId },
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
                        as: 'Followings',
                        attributes: ['id'],
                    },
                    {
                        model: User,
                        as: 'Followers',
                        attributes: ['id'],
                    },
                ],
            });

            if (fullUserWithoutPassword) {
                const data = fullUserWithoutPassword.toJSON(); // 개인정보 감춤
                data.Posts = data.Posts.length;
                data.Followers = data.Followers.length;
                data.Followings = data.Followings.length;
                res.status(200).json(data);
            } else {
                res.status(404).json('존재하지 않는 사용자');
            }
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
                console.error('login Error', loginErr);
                return next(loginErr);
            }
            try {
                const fullUserWithoutPassword = await User.findOne({
                    where: { id: user.id },
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
                            as: 'Followings',
                            attributes: ['id'],
                        },
                        {
                            model: User,
                            as: 'Followers',
                            attributes: ['id'],
                        },
                    ],
                });
                console.log(fullUserWithoutPassword);
                return res.status(200).json(fullUserWithoutPassword);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update(
            {
                nikcname: req.body.nickname,
            },
            {
                where: { id: req.user.id },
            },
        );
        res.status(200).json({ nickanme: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.UserId } });
        if (!user) {
            return res.status(404).send('없는 사람입니다.');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ id: parseInt(req.params.UserId) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// unfollow
router.delete('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.UserId } });
        if (!user) {
            return res.status(404).send('언팔로우 할 수 없습니다.');
        }
        await user.removeFollwers(req.user.id);
        res.status(200).json({ id: parseInt(req.params.UserId) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
    // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).send('없는 사람입니다.');
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// followings
router.get('/followers', isLoggedIn, async (req, res, next) => {
    // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).send('없는 사람입니다.');
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
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
