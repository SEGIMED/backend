import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatPulmonaryHypertensionGroup', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "group_name_uk"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'cat_pulmonary_hypertension_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_pulmonary_hypertension_group_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "group_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};

export default model