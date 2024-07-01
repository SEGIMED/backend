import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatAnthropometricMeasureType', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "name_uk"
        },
        measureUnit: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'cat_measure_unit',
                key: 'id'
            },
            field: 'measure_unit'
        }
    }, {
        tableName: 'cat_anthropometric_measure_type',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_anthropometric_measure_type_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model
