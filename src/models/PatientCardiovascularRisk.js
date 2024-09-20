import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PatientCardiovascularRisk', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        registerTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'register_timestamp'
        },
        physician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        risk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_risk',
                key: 'id'
            }
        }
    }, {
        tableName: 'patient_cardiovascular_risk',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "patient_cardiovascular_risk_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model

