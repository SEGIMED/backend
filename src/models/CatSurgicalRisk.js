import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatSurgicalRisk', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "surgical_risk_name_uk"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'cat_surgical_risk',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_surgical_risk_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "surgical_risk_name_uk",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};

export default model

