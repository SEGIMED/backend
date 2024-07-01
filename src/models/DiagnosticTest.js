import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('DiagnosticTest', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        testType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_diagnostic_test_type',
                key: 'id'
            },
            field: 'test_type'
        },
        diagnosticTestPrescription: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'diagnostic_test_prescription',
                key: 'id'
            },
            field: 'diagnostic_test_prescription'
        },
        resultsInterpretation: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'results_interpretation'
        },
        fileUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'file_url'
        },
        practicedTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'practiced_timestamp'
        },
        registeredTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'registered_timestamp'
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        scheduling: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'appointment_scheduling',
                key: 'id'
            }
        },
        medicalEvent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'medical_event',
                key: 'id'
            },
            field: 'medical_event'
        }
    }, {
        tableName: 'diagnostic_test',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "diagnostic_test_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
