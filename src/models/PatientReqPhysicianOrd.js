import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PatientReqPhysicianOrd",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientRequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "patient_request_id",
      },
      physicianOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician_order_id",
      },
    },
    {
      tableName: "patient_req_physician_ord",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

export default model;
