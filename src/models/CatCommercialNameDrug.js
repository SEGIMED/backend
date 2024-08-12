import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "CatCommercialNameDrug",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      drugId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "cat_drug",
          key: "id",
        },
        field:"drug_id"
      },
    },
    {
      tableName: "cat_comercial_name_drug",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "cat_comercial_name_drug_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
