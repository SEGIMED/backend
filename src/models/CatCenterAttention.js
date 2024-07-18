import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "CatCenterAttention",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_city",
          key: "id",
        },
      },
    },
    {
      tableName: "cat_center_attention",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "cat_center_attention_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;