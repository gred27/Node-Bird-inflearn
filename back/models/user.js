module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            // 기본 id 들어감
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, // 필수
                unique: true, // pk
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci', //한글 저장
        },
    );
    User.associate = db => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'Followers',
            foreignKey: 'FollowingId',
        }); // 같은 테이블의 many to many 관계가 생길때 foriegn key를 지정해준다m
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'Followings',
            foreignKey: 'FollowerId',
        });
    };
    return User;
};
