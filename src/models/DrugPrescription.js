import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('DrugPrescription', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
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
        patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        prescribedPhysician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'prescribed_physician'
        },
        prescriptionTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'prescription_timestamp'
        },
        drug: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_drug',
                key: 'id'
            }
        },
        prescribedDose: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'prescribed_dose'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'quantity'
        },

    }, {
        tableName: 'drug_prescription',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "drug_prescription_pk",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};

export default model