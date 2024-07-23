import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
sequelize.define('RequestFollow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userSent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_send',
        references: {
            model: 'user',
            key: 'id'
        }
    },
    userReceptor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_receptor',
        references: {
            model: 'user',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'request_follow',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
};

export default model;