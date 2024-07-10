import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianFavoritePatient', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        favoritePatient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "favorite_patient",
            references: {
                model: 'Users', 
                key: 'id', 
            },
        },
        physicianId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "physician_id",
            references: {
                model: 'Users', 
                key: 'id', 
            },
        },
    }, {
        tableName: 'physician_favorite_patients',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: 'unique_favorite_patient_physician_id',
                unique: true,
                fields: ['favorite_patient', 'physician_id'],
            },
        ]
    });
}

export default model;
