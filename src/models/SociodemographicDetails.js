import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "SociodemographicDetails",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      patient: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
        unique: "sociodemographic_details_patient_uk",
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "birth_date",
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_genre",
          key: "id",
        },
      },
      educationalLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_educational_level",
          key: "id",
        },
        field: "educational_level",
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      civilStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_civil_status",
          key: "id",
        },
        field: "civil_status",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      healthCarePlan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cat_health_care_plan",
          key: "id",
        },
        field: "health_care_plan ",
      },
      healthCareNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "health_care_number",
      },
      emergencyContactPhone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "emergency_contact_phone",
      },
      dateOfDeathReport: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "date_of_death_report",
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "registration_date",
      },
      //nuevas propiedades agregadas
      hipertPulm: {
        //hipertensión pulmonar
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
        field: "hipert_pulm",
      },
      centerAttention: {
        //centro de atención
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "center_attention",
        references: {
          model: "cat_center_attention",
          key: "id",
        },
      },
      liveAlone: {
        //vive solo
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "live_alone",
      },
      hasTechUseDifficulty: {
        //dificultad en el uso de tecnología
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "has_tech_use_difficulty",
      },
      needsCellphoneAssistance: {
        //necesita asistencia de celular
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "needs_cell_phone_assistance",
      },
      NumberOfFamilyAsistence: {
        //número de familiares que asisten
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        field: "number_of_family_asistence",
      },
    },
    {
      tableName: "sociodemographic_details",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "sociodemographic_details_patient_uk",
          unique: true,
          fields: [{ name: "patient" }],
        },
        {
          name: "sociodemographic_details_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
