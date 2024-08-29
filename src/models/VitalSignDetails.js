import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "VitalSignDetails",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
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
      measure: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      measureTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "measure_timestamp",
      },
      measureSource: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "measure_source",
      },
      measureType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_vital_sign_measure_type",
          key: "id",
        },
        field: "measure_type",
      },
      scheduling: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "appointment_scheduling",
          key: "id",
        },
      },
      medicalEvent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "medical_event",
          key: "id",
        },
        field: "medical_event",
      },
      selfEvaluationEvent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "self_evaluation_event",
          key: "id",
        },
        field: "self_evaluation_event",
      },
    },
    {
      tableName: "vital_sign_details",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "vital_sign_details_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
