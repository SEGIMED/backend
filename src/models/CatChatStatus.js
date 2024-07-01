import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('CatChatStatus', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        statusName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "cat_chat_status_name",
            field: 'status_name'
        }
    }, {
        tableName: 'cat_chat_status',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "cat_chat_status_name",
                unique: true,
                fields: [
                    {name: "status_name"},
                ]
            },
            {
                name: "cat_chat_status_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
