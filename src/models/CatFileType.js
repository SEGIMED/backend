import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;
const model = (sequelize) => {
  sequelize.define(
    "CatFileType",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "cat_file_type",
      schema: "public",
      timestamps: false,
    }
  );
};
export default model;
