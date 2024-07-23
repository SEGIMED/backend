import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PatientPhysicalExamination",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      physicalSubsystem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_physical_subsystem",
          key: "id",
        },
        field: "physical_subsystem",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      medicalEvent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medical_event",
          key: "id",
        },
        field: "medical_event",
      },
      appointmentScheduling: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "appointment_scheduling",
          key: "id",
        },
        field: "appointment_scheduling",
      },
    },
    {
      tableName: "patient_physical_examination",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "patient_physical_examination_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
