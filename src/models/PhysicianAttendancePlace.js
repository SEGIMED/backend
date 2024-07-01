import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianAttendancePlace', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        physician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        googleMapsLink: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'google_maps_link'
        },
        addressDetails: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'address_details'
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'physician_attendance_place',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "physician_attendance_place_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
