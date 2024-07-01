import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatPhysicalSubsystem', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "cat_physical_subsystems_uk"
        }
    }, {
        tableName: 'cat_physical_subsystem',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_physical_subsystem_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "cat_physical_subsystems_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};

export default model

