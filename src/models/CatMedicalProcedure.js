import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatMedicalProcedure', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        procedureType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_procedure_type',
                key: 'id'
            },
            field: 'procedure_type'
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: "cat_medical_procedure_name_uk"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        procedureCode: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'procedure_code'
        }
    }, {
        tableName: 'cat_medical_procedure',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_medical_procedure_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "cat_medical_procedure_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model