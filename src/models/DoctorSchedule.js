import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "DoctorSchedule",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // foreinkey
          key: "id", // clave de relacion
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "doctor_schedule",
      schema: "public",
      timesTamps: false,
    }
  );
};

export default model;
