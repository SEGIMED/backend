import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatVitalSignMeasureType', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "cat_vital_sign_measure_type_name_uk"
        },
        measureUnit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_measure_unit',
                key: 'id'
            },
            field: 'measure_unit'
        }
    }, {
        tableName: 'cat_vital_sign_measure_type',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_vital_sign_measure_type_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_vital_sign_measure_type_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
