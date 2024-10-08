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
      token: {
        type: DataTypes.STRING(5),
        allowNull: true,
        field: "token",
        unique: true,
      },
      tokenExpiresAt: {
        type: DataTypes.DATE,
        field: "token_expires_at",
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        field: "verified",
        allowNull: false,
        defaultValue: false,
      },
      documentationComplete: {
        type: DataTypes.BOOLEAN,
        field: "documentation_complete",
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "physician_onboarding",
      schema: "public",
      timestamps: false,
    }
  );
};

export default model;
