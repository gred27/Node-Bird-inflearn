module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
        "Hashtag",
        {
            // 기본 id 들어감
            content: {},
        },
        {
            charset: "utf8mb4",
            colate: "utf8mb4_general_ci", //이모티콘 저장
        }
    );
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
    };
    return Hashtag;
};
