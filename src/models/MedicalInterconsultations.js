import sequelize from "sequelize";
const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  return sequelize.define(
    "MedicalInterconsultations",
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
      physicianRequester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician_requester",
      },
      physicianQueried: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician_queried",
      },
      medicalSpecialty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_medical_specialty",
          key: "id",
        },
        field: "medical_specialty",
      },
      interconsultationStartTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "interconsultation_start_timestamp",
      },
      interconsultationEndTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "interconsultation_end_timestamp",
      },
      interconsultationStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_scheduling_status",
          key: "id",
        },
        field: "interconsultation_status",
      },
      reasonForConsultation: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "reason_for_consultation",
      },
      medicalOpinion: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "medical_opinion",
      },
      problemResume: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "problem_resume",
      },
      isPriority: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_priority",
      },
    },
    {
      tableName: "medical_interconsultation",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "medical_interconsultation_id_key",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "medical_interconsultation_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
