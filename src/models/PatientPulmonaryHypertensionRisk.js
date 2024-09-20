import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PatientPulmonaryHypertensionRisk', {
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
        pulmonaryHypertensionRisk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_risk',
                key: 'id'
            },
            field: 'pulmonary_hypertension_risk'
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
        tableName: 'patient_pulmonary_hypertension_risk',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "patient_pulmonary_hypertension_risk_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model

