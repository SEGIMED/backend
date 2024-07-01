import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatPainType', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "pain_type_name_uk"
    }
  }, {
    tableName: 'cat_pain_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_pain_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pain_type_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};

export default model
