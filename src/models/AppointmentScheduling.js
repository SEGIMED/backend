import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "AppointmentScheduling",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      physician: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      medicalSpecialty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_medical_specialty",
          key: "id",
        },
        field: "medical_specialty",
      },
      scheduledStartTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "scheduled_start_timestamp",
      },
      scheduledEndTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "scheduled_end_timestamp",
      },
      actualEndTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "actual_end_timestamp",
      },
      actualStartTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "actual_start_timestamp",
      },
      schedulingStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_scheduling_status",
          key: "id",
        },
        field: "scheduling_status",
      },
      typeOfMedicalConsultation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_appointment_modality",
          key: "id",
        },
        field: "type_of_medical_consultation",
      },
      IsApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        field: "approved",
      },
      reasonForConsultation: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "reason_for_consultation",
      },
      healthCenter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "physician_attendance_place",
          key: "id",
        },
        field: "health_center",
      },
    },
    {
      tableName: "appointment_scheduling",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "scheduling_appointment_id_key",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "scheduling_appointment_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
