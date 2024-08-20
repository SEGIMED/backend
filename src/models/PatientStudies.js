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
        allowNull: true,
      },
      studyType: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false
      }
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
