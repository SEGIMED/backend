import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "ProvisionalPreConsultation",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: "provisonal_pre_consultation_id_pk",
      },
      patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      appointmentSchedule: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "appointment_schedule",
        references: {
          model: "appointment_scheduling",
          key: "id",
        },
      },
      lackOfAir: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "lack_of_air",
      },
      lackOfAirAsAlways: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "lack_of_air_as_always",
      },
      lackOfAirIncremented: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "lack_of_air_incremented",
      },
      lackOfAirClasification: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "lack_of_air_clasification",
      },
      chestPainAtRest: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "chest_pain_at_rest",
      },
      chestPainOnExertion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "chest_pain_on_exertion",
      },
      chestPainOnExertionAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "chest_pain_on_exertion_amount",
      },
      edemaPresence: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "edema_presence",
      },
      edemaPresenceDescription: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "edema_presence_description",
      },
      feelings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      healthChanges: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "health_changes",
      },
      healthChangesDescription: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "health_changes_description",
      },
      healthWorsened: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "health_worsened",
      },
      bodyPain: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "body_pain",
      },
      mentalHealthAffected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "mental_health_affected",
      },
      mentalHealthAffectedDescription: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "mental_health_affected_description",
      },
      energyStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "energy_status",
        validate: {
          max: 10,
          min: 1,
        },
      },
      feed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hydrationStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "hydration_status",
      },
      urineStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "urine_status",
      },
      exerciseStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "exercise_status",
      },
      physicalExamination: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "physical_examination",
        references: {
          model: "patient_pain_map",
          key: "id",
        },
      },
      pendingStudies: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "pending_studies",
      },
      consultationReason: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "consultation_reason",
      },
      importantSymptoms: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "important_symptoms",
      },
      currentMedications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true, //TODO CAMBIAR A FALSE
        field: "current_medications",
      },
      status: {
        type: DataTypes.ENUM("pending", "sent"),
        allowNull: true,
        defaultValue: "pending",
      },
      abnormalGlycemia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "abnormal_glycemia",
      },
      respiratoryFunctional: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "respiratory_functional",
      },
    },
    {
      tableName: "provisional_pre_consultation",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "provisonal_pre_consultation_id_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
