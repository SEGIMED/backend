import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianMedicalRegistry', {
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
        registryId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "registry_id_uk",
            field: 'registry_id'
        },
        registryType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_registration_type',
                key: 'id'
            },
            field: 'registry_type'
        }
    }, {
        tableName: 'physician_medical_registry',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "physician_medical_registry_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "registry_id_uk",
                unique: true,
                fields: [
                    {name: "registry_id"},
                ]
            },
        ]
    });
};

export default model