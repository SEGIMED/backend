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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "0",
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "cat_city",
          key: "id",
        },
      },
      urlMap: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"url_map"
      }
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