import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatPainFrequency', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "pain_frequency_name_uk"
    }
  }, {
    tableName: 'cat_pain_frequency',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_pain_frequency_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pain_frequency_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};

export default model
