import { DataTypes } from "sequelize";

const model = (sequelize) => {
  sequelize.define(
    "UserComorbidities",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "patient_id"
      },
      diseaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_comorbidities_diseases",
          key: "id",
        },
        field: "disease_id"
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: "created_at"
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: "updated_at"
      },
    },
    {
      tableName: "user_comorbidities",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "diseaseId"],
        },
      ],
    }
  );
};

export default model;
