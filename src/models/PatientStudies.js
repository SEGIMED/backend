import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;
const model = (sequelize) => {
  sequelize.define(
    "PatientStudies",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      patient: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      schedule: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "appointment_scheduling",
          key: "id",
        },
      },
      study: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      studyType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_study_type",
          key: "id",
        },
        defaultValue: 10,
        field: "study_type",
        validate: {
          min: 1,
          max: 10,
        },
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "patient_studies",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "patient_studies_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
