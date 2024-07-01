import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PatientDiagnostic', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        diagnosedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'diagnosed_by'
        },
        medicalEvent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'medical_event',
                key: 'id'
            },
            field: 'medical_event'
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        disease: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_disease',
                key: 'id'
            }
        },
        diagnosticNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'diagnostic_notes'
        },
        diseaseEtiology: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'disease_etiology'
        }
    }, {
        tableName: 'patient_diagnostic',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "patient_diagnostic_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model