import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;
const model = (sequelize) => {
  sequelize.define(
    "PhysicianFiles",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      physicianId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "physician_id",
        references: {
          model: "user",
          key: "id",
        },
      },
      fileType: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "file_type",
        references: {
          model: "cat_file_type",
          key: "id",
        },
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "physician_files",
      schema: "public",
      timestamps: false,
    }
  );
};
export default model;
