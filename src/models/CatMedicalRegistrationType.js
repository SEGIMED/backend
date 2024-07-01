import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatMedicalRegistrationType', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "registration_type_name_uk"
        }
    }, {
        tableName: 'cat_medical_registration_type',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_medical_registration_type_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "registration_type_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model
