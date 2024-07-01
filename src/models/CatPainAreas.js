import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatPainAreas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nameOnLibrary: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'name_on_library'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'cat_pain_areas',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_pain_areas_pkey",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
