import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) =>{
    sequelize.define('CatAlarmAccidents',{
        id:{
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        priority:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    },{
        tableName: 'cat_alarm_accidents',
        schema: 'public',
        timestamps: false,
        indexes:[
            {
                name:"cat_alarm_accidents_pk",
                unique: true,
                fields:[
                    {name:"id"}
                ]
            }
        ]
    })
};

export default model
