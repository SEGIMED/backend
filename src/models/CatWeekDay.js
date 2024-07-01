import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatWeekDay', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "cat_week_day_name_uk"
        }
    }, {
        tableName: 'cat_week_day',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_week_day_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_week_day_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
