import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) =>{
    sequelize.define('CatAlarmCardiovascularSystem',{
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
        tableName: 'cat_alarm_cardiovascular_system',
        schema: 'public',
        timestamps: false,
        indexes:[
            {
                name:"cat_alarm_cardiovascular_system_pk",
                unique: true,
                fields:[
                    {name:"id"}
                ]
            }
        ]
    })
};

export default model    