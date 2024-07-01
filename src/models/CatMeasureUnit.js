import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatMeasureUnit', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "cat_measure_unit_name_uk"
        }
    }, {
        tableName: 'cat_measure_unit',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_measure_unit_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_measure_unit_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
