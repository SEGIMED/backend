import { DataTypes } from "sequelize";
import CatComorbiditiesCategories from "./CatComorbiditiesCategories.js"; // Ajusta la ruta según tu estructura

const model = (sequelize) => {
  const CatComorbiditiesDiseases = sequelize.define(
    "CatComorbiditiesDiseases",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "cat_comorbidities_categories",
          key: "id",
        },
        field: "category_id",
        allowNull: false,
      },
      subcategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "cat_comorbidities_diseases",
      timestamps: false,
    }
  );
};

export default model;
