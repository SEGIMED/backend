import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatCountry', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "country_name_uk"
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'cat_country',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_country_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "country_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model
