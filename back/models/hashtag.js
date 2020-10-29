module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
        'Hashtag',
        {
            // 기본 id 들어감
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            charset: 'utf8mb4',
            colate: 'utf8mb4_general_ci', //이모티콘 저장
        },
    );
    Hashtag.associate = db => {
        // through : many to many 관계에서 자동 생성되는 중간테이블의 이름 지정
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
    return Hashtag;
};
