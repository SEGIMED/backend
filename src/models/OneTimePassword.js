import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('OneTimePassword', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        temporaryCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'temporary_code'
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        creationTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'creation_timestamp'
        },
        redeemedTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'redeemed_timestamp'
        },
        expirationTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expiration_timestamp'
        }
    }, {
        tableName: 'one_time_password',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "one_time_password_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model