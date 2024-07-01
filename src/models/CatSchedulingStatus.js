import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatSchedulingStatus', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "cat_scheduling_status_name_uk"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'cat_scheduling_status',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_scheduling_status_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "scheduling_status_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
