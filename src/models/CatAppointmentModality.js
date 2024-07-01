import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatAppointmentModality', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "name_appointment_modality_uk"
        }
    }, {
        tableName: 'cat_appointment_modality',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_appointment_modality_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "name_appointment_modality_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model
