module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        'Image',
        {
            // 기본 id 들어감
            src: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci', //이모티콘 저장
        },
    );
    Image.associate = db => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
