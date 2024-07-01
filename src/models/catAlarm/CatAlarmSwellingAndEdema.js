import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) =>{
    sequelize.define('CatAlarmSwellingAndEdema',{
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
        tableName: 'cat_alarm_swelling_and_edema',
        schema: 'public',
        timestamps: false,
        indexes:[
            {
                name:"cat_alarm_swelling_and_edema",
                unique: true,
                fields:[
                    {name:"id"}
                ]
            }
        ]
    })
};

export default model