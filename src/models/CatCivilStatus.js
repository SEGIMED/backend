import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatCivilStatus', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'cat_civil_status',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_civil_status_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model

