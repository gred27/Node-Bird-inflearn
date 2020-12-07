// router의 미들웨어 커스텀 구현
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // 다음 미들웨어로
        next();
    } else {
        res.status(401).send('로그인 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
};
