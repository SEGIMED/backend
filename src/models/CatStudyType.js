import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;
const model = (sequelize) => {
    sequelize.define('CatStudyType', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "name_study_type_uk"
        }
    }, {
        tableName: 'cat_study_type',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_study_type_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "name_study_type_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model