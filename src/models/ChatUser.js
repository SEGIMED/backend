import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('ChatUser', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        chat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chat',
                key: 'id'
            }
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        tableName: 'chat_user',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "chat_user_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model