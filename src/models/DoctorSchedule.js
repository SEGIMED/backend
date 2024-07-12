import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
<<<<<<< HEAD
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
=======
    sequelize.define("DoctorSchedule", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        }, 
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "user", // foreinkey
                key: "id" // clave de relacion
        },
            onUpdate: "CASCADE",
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        tableName: "doctor_schedule",
        schema: "public",
        timesTamps: false
    })
}
>>>>>>> 7626c4e9befcdc8caf42d3cceac5b9fe60b442e3

export default model;
