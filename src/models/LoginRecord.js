import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('LoginRecord', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: "login_record_id_key"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'user',
                key: 'id'
            },
        },
        record: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'login_record',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "login_record_id_key",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            }
        ]
    });
};

export default model