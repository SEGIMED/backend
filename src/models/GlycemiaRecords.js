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
    },
    {
      tableName: "glycemia_records",
      schema: "public",
      timestamp: true,
    }
  );
};

export default model;
