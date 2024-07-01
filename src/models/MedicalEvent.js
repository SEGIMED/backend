import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('MedicalEvent', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        physicianComments: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'physician_comments'
        },
        scheduling: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'appointment_scheduling',
                key: 'id'
            }
        },
        chiefComplaint: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'chief_complaint'
        },
        historyOfPresentIllness: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'history_of_present_illness'
        },
        reviewOfSystems: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'review_of_systems'
        },
        treatmentPlan: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'treatment_plan '
        },
        pendingDiagnosticTest: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'pending_diagnostic_test'
        },
        alarmPattern: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'alarm_pattern'
        }
    }, {
        tableName: 'medical_event',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "medical_event_pk",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "medical_event_scheduling_uk",
                unique: true,
                fields: [
                    { name: "scheduling" },
                ]
            },
        ]
    });
};

export default model