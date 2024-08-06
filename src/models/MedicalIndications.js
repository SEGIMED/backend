import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "MedicalIndications",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "medical_indications",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "medical_indications_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
