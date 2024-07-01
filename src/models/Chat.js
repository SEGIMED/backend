import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('Chat', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        chatName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'chat_name'
        },
        creationTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'creation_timestamp'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_chat_status',
                key: 'id'
            }
        },
        closureTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'closure_timestamp'
        }
    }, {
        tableName: 'chat',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "chat_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model
