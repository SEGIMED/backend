import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatProvince', {
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
        country: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_country',
                key: 'id'
            }
        }
    }, {
        tableName: 'cat_province',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_province_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
