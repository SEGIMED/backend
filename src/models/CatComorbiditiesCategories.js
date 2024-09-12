import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  return sequelize.define(
    'CatComorbiditiesCategories',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'cat_comorbidities_categories',
      timestamps: false 
    }
  );
};

export default model;
