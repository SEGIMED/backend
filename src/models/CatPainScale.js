import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatPainScale', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "pain_scale_name_uk"
    }
  }, {
    tableName: 'cat_pain_scale',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_pain_scale_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pain_scale_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};

export default model
