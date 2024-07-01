import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PatientHeartFailureClassification', {
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
        heartFailureClassification: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_heart_failure_classification',
                key: 'id'
            },
            field: 'heart_failure_classification'
        },
        physician: {
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
        }
    }, {
        tableName: 'patient_heart_failure_classification',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "heart_failure_classification_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model

