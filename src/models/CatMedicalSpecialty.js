import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatMedicalSpecialty', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "cat_medical_specialty_name-uk"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'cat_medical_specialty',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_medical_specialty_name-uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_medical_specialty_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model