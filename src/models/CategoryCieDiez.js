import sequelize from "sequelize";
import { DataTypes } from "sequelize";

const model = (sequelize) => {
  sequelize.define(
    "CategoryCieDiez",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "category_cie_diez",
      timestamps: false,
    }
  );
};

export default model;
