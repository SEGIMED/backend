import sequelize from "sequelize";

import { DataTypes } from "sequelize";

const model = (sequelize) => {
  sequelize.define(
    "PatientMedicalReq",
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
        allowNull: true,
        defaultValue: "Otro",
        field: "req_types",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_at",
        default: DataTypes.NOW,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "message",
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "status",
      },
    },
    {
      tableName: "patient_medical_req",
      timestamps: false,
    }
  );
};

export default model;
