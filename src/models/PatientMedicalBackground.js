import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PatientMedicalBackground', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        disease: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_disease',
                key: 'id'
            }
        },
        diagnostic: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'patient_diagnostic',
                key: 'id'
            }
        },
        backgroundType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_background_type',
                key: 'id'
            },
            field: 'background_type'
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'patient_medical_background',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "patient_medical_background_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model