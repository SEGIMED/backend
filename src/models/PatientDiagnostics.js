import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PatientDiagnostics",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
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
      physicianOrder: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "physician_orders",
          key: "id",
        },
        field: "physician_order",
      },
      diagnostic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "subcategories_cie_diez",
          key: "id",
        },
        field: "diagnostic"
      },
    },
    {
      tableName: "patient_diagnostics",
      schema: "public",
      timestamps: false
    }
  );
};

export default model;
