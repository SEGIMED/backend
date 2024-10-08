import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "MedicationPrescription",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      startTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_timestamp",
      },
      medicalEventId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "medical_event_id",
        references: {
          model: "medical_event",
          key: "id",
        },
      },
      patientId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "patient_id",
        references: {
          model: "user",
        },
      },
      physicianId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "physician_id",
        references: {
          model: "user",
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      endTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "end_timestamp",
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      medicalOrderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "medical_order_id",
        references: {
          model: "physician_orders",
          key: "id",
        },
      },
    },
    {
      tableName: "medication_prescription",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "medication_prescription_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
