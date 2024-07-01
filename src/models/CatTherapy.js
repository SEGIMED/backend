import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatTherapy', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "cat_therapy_name_uk"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'cat_therapy',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_therapy_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "cat_therapy_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model
