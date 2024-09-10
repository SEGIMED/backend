import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PatientDiagnostics",
    {
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
        allowNull:true,
        references: {
            model: "physician_orders",
            key:"id"
        },
        field: "physician_order"
      },
      diagnostic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "subcategories_cie_diez",
          key: "id",
        },
      },
    },
    {
      tableName: "medical_event_diagnostic",
      schema: "public",
    }
  );
};

export default model;