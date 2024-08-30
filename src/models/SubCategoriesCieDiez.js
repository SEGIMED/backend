import { DataTypes } from "sequelize";

const model = (sequelize) => {
  sequelize.define(
    "SubCategoriesCieDiez",
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
        validate: {
          notNull: {
            msg: "La descripción es requerida",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "category_cie_diez",
          key: "id",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "La categoría es requerida",
          },
        },
      },
    },
    {
      tableName: "subcategories_cie_diez",
      timestamps: false,
    }
  );
};

export default model;
