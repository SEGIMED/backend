import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianSpecialty', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
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
        medicalSpecialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_specialty',
                key: 'id'
            },
            field: 'medical_specialty'
        }
    }, {
        tableName: 'physician_specialty',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "physician_specialty_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model