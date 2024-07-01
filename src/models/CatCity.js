import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatCity', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "city_name_province_uk"
        },
        province: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_province',
                key: 'id'
            },
            unique: "city_name_province_uk"
        }
    }, {
        tableName: 'cat_city',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_city_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "city_name_province_uk",
                unique: true,
                fields: [
                    {name: "name"},
                    {name: "province"},
                ]
            },
        ]
    });
};

export default model
