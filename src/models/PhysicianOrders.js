import sequelize from "sequelize";

import { DataTypes } from "sequelize";

const model = (sequelize) => {
  sequelize.define(
    "PhysicianOrders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "patient_id",
      },
      physicianId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician_id",
      },
      reqTypes: {
        type: DataTypes.ENUM(
          "Receta médica",
          "Resumen de historia clínica",
          "Autorización de medicamentos",
          "Autorización de estudios",
          "Aptos físicos",
          "Incapacidades",
          "Certificados",
          "Otro"
        ),
        allowNull: false,
        defaultValue: "Otro",
        field: "req_types",
      },
      indications: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "indications",
      },
      diagnostic: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "diagnostic",
      },
      additionalText: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "additional_text",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date",
        defaultValue: DataTypes.NOW,
      },
      updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "physician_orders",
      timestamps: false,
    }
  );
};

export default model;
