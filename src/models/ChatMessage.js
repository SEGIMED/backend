import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('ChatMessage', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        recipient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        messageTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'message_timestamp'
        },
        chat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chat',
                key: 'id'
            }
        }
    }, {
        tableName: 'chat_message',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "chat_message_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model