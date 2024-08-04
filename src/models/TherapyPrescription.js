import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "TherapyPrescription",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      therapyDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "therapy_description",
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
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      therapy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_therapy",
          key: "id",
        },
      },
    },
    {
      tableName: "therapy_prescription",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "therapy_prescription_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
