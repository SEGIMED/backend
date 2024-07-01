import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('DiagnosticTestPrescription', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
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
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        prescriptionTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'prescription_timestamp'
        },
        medicalEvent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'medical_event',
                key: 'id'
            },
            field: 'medical_event'
        }
    }, {
        tableName: 'diagnostic_test_prescription',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "diagnostic_test_prescription_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model