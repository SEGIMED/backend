import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatIdType', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "id_type_name_uk"
        }
    }, {
        tableName: 'cat_id_type',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "id_type_name_uk",
                unique: true,
                fields: [
                    {name: "name"},
                ]
            },
            {
                name: "id_type_pkey",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
