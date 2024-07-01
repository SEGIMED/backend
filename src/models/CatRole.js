import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatRole', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: "role_name_uk",
            field: 'role_name'
        }
    }, {
        tableName: 'cat_role',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "role_name_uk",
                unique: true,
                fields: [
                    {name: "role_name"},
                ]
            },
            {
                name: "role_pkey",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
