import sequelize from "sequelize";
const { DataTypes } = sequelize;
const model = (sequelize) => {
  sequelize.define(
    "RequestTreatingPhysician",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      patient: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        field: "patient",
      },
      physician: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician",
      },
      status: {
        type: DataTypes.ENUM("Pendiente", "Aceptada", "Rechazada"),
        defaultValue: "Pendiente",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_active",
      },
      senderType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "sender_type",
      },
    },
    {
      tableName: "request_treating_physician",
      schema: "public",
      timestamps: false,
      hooks: {
        afterUpdate: async (instance, options) => {
          if (instance.status === "Rechazada") {
            await instance.destroy();
          }
        },
      },
    }
  );
};
export default model;
