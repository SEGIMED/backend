import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('MedicalReferral', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_medical_specialty',
                key: 'id'
            }
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prescribedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'prescribed_by'
        },
        medicalEvent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'medical_event',
                key: 'id'
            },
            field: 'medical_event'
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'medical_referral',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "medical_referral_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model