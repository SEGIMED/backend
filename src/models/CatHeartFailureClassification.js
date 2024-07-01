import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatHeartFailureClassification', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'cat_heart_failure_classification',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_heart_failure_classification_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model

