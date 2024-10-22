import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "user_id_number_key",
        field: "id_number",
      },
      idType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_id_type",
          key: "id",
        },
        field: "id_type",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cat_role",
          key: "id",
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      areaCode: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "area_code",
      },
      cellphone: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "user_cellphone_key",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "user_email_key",
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login",
      },
      currentLocation: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_city",
          key: "id",
        },
        field: "current_location",
      },
      geolocation: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true,
      },
    },
    {
      tableName: "user",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "user_cellphone_key",
          unique: true,
          fields: [{ name: "cellphone" }],
        },
        {
          name: "user_email_key",
          unique: true,
          fields: [{ name: "email" }],
        },
        {
          name: "user_id_number_key",
          unique: true,
          fields: [{ name: "id_number" }],
        },
        {
          name: "user_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
