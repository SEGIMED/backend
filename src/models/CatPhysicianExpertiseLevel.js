import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('CatPhysicianExpertiseLevel', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'cat_physician_expertise_level',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cat_physician_expertise_level_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model
