module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "User",
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
            charset: "utf8",
            colate: "utf8_general_ci", //한글 저장
        }
    );
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    };
    return User;
};
