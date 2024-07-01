import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatDrug', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "cat_medicine_name_uk"
        },
        composition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        presentation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_drug_presentation',
                key: 'id'
            }
        },
        defaultDose: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'default_dose'
        },
        laboratory: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'cat_drug',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_medicine_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_medicine_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model