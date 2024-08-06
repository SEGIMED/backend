import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PhysicianOnboarding",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      idPhysician: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_physician",
        references: {
          model: "user",
          key: "id",
        },
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_genre",
          key: "id",
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "birth_date",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      centerAttention: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "center_attention",
        references: {
          model: "cat_center_attention",
          key: "id",
        },
      }
    },
    {
      tableName: "physician_onboarding",
      schema: "public",
      timestamps: false,
    }
  );
};

export default model;
