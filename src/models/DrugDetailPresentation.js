import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "DrugDetailPresentation",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      drugId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "cat_drug",
          key: "id",
        },
        field: "drug_id",
      },
      presentationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "cat_drug_presentation",
          key: "id",
        },
        field: "presentation_id",
      },
      dose: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      measureUnitId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "cat_measure_unit",
          key: "id",
        },
        field: "measure_unit_id",
      },
      routeOfAdministrationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "cat_route_of_administration",
          key: "id",
        },
        field: "route_of_administration_id",
      },
    },
    {
      tableName: "drug_detail_presentation",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "drug_detail_presentation_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
