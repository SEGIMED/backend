import { Schema } from "mongoose";
import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

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
      orderTypes: {
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
        field: "order_types",
      },
      medicalPrescriptionId: {
        // con esta ya traer la precscription modifications history
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "medication_prescription",
          key: "id",
        },
        field: "medical_prescription_id",
      },
      prescription_modifications_hist_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "prescription_modifications_history",
          key: "id",
        },
        field: "prescription_modifications_hist_id",
      },

      indications: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "indications",
      },
      diagnostic: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "diagnostic",
      },
      additionalText: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "additional_text",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "date",
      },
      updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_at",
      },
    },
    {
      tableName: "physician_orders",
      timestamps: false,
    }
  );
};

export default model;
