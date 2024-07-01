import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianAgendaConfiguration', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        physician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'end_date'
        },
        includeHolidays: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'include_holidays'
        },
        weekDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_week_day',
                key: 'id'
            },
            field: 'week_day'
        },
        specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_specialty',
                key: 'id'
            }
        },
        modality: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_appointment_modality',
                key: 'id'
            }
        },
        attendancePlace: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'physician_attendance_place',
                key: 'id'
            },
            field: 'attendance_place'
        },
        reminderPatientNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'reminder_patient_notes'
        },
        enablementReminder: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'enablement_reminder'
        },
        appointmentDuration: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'appointment_duration'
        }
    }, {
        tableName: 'physician_agenda_configuration',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "physician_agenda_configuration_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model