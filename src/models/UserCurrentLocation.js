import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('UserCurrentLocation', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            //TODO UNIQUE . If theres one register, change it for the new one
        },
        city:{
            type: DataTypes.STRING(60),
            allowNull:false
        },
        country:{
            type: DataTypes.STRING(60),
            allowNull:false
        }
    },{
        tableName: 'user_current_location',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name:"user_current_location_pk",
                unique: true,
                fields:[
                    { name: "id"}
                ]
            }
        ]
    })
}

export default model