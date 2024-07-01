import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('MedicalProcedurePrescription', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        medicalProcedure: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_procedure',
                key: 'id'
            },
            field: 'medical_procedure'
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
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        prescribedPhysician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'prescribed_physician'
        },
        prescriptionTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'prescription_timestamp'
        }
    }, {
        tableName: 'medical_procedure_prescription',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "medical_procedure_prescription_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
