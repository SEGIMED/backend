import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('SociodemographicDetails', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: "sociodemographic_details_patient_uk"
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'birth_date'
        },
        genre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_genre',
                key: 'id'
            }
        },
        educationalLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_educational_level',
                key: 'id'
            },
            field: 'educational_level'
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        civilStatus: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'cat_civil_status',
                key: 'id'
            },
            field: 'civil_status'
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        healthCarePlan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cat_health_care_plan',
                key: 'id'
            },
            field: 'health_care_plan '
        },
        healthCareNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'health_care_number'
        },
        emergencyContactPhone: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'emergency_contact_phone'
        },
        dateOfDeathReport: {
            type: DataTypes.DATE,
            allowNull:true,
            defaultValue: DataTypes.NOW,
            field: "date_of_death_report",
        }
    }, {
        tableName: 'sociodemographic_details',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "sociodemographic_details_patient_uk",
                unique: true,
                fields: [
                    { name: "patient" },
                ]
            },
            {
                name: "sociodemographic_details_pk",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};

export default model