module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        "Image",
        {
            // 기본 id 들어감
            content: {},
        },
        {
            charset: "utf8mb4",
            colate: "utf8mb4_general_ci", //이모티콘 저장
        }
    );
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
