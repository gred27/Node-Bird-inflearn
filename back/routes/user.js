const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword,
    });
    res.send('ok');
    res.json();
});

module.exports = router;
