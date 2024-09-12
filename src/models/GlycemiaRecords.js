import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "GlycemiaRecords",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      selfEvaluationEvent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "self_evaluation_event",
        references: {
          model: "self_evaluation_event",
          key: "id",
        },
      },
      medicalEvent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "medical_event",
        references: {
          model: "medical_event",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "glycemia_records",
      schema: "public",
      timestamp: true,
    }
  );
};

export default model;
