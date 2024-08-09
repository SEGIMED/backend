import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "AttendentPlace",
    {
      idPhysician: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "id",
        },
        field: "id_physician",
      },
      idCenterAttention: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "center_attention",
          key: "id",
        },
        field: "id_center_attention",
      },
    },
    {
      tableName: "attendent_place",
      schema: "public",
      timestamps: false,
    }
  );
};

export default model;
