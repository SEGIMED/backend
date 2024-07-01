import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatDisease', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        diseaseCode: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'disease_code'
        }
    }, {
        tableName: 'cat_disease',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_disease_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model