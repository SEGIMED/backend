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
      requestPatientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "patient_medical_req",
          key: "id",
        },
        field: "request_patient_id",
      },
      diagnostic: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model:"sub_categories_cie_diez",
          key:"id"
        }
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
      orderPdf: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "order_pdf",
      },
    },
    {
      tableName: "physician_orders",
      timestamps: false,
    }
  );
};

export default model;
