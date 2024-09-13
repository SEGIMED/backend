import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "MedicalEvent",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      physicianComments: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "physician_comments",
      },
      scheduling: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "appointment_scheduling",
          key: "id",
        },
      },
      historyOfPresentIllness: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "history_of_present_illness",
      },
      treatmentPlan: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "treatment_plan",
      },
      alarmPattern: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "alarm_pattern",
      },
      primaryDiagnostic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "subcategories_cie_diez",
          key: "id",
        },
        field: "primary_diagnostic",
      },
      diagnosticNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "diagnostic_notes",
      },
      reasonForConsultationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "reason_for_consultation_id",
        references: {
          model: "cat_consultation_reason",
          key: "id",
        },
      },
    },
    {
      tableName: "medical_event",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "medical_event_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "medical_event_scheduling_uk",
          unique: true,
          fields: [{ name: "scheduling" }],
        },
      ],
    }
  );
};

export default model;
