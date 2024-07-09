import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define("DoctorSchedule", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }, 
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User", // foreinkey
                key: "id" // clave de relacion
        },
            onUpdate: "CASCADE",
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        }
    }, {
        tableName: "doctor_schedule",
        schema: "public",
        timesTamps: false
    })
}

export default model;