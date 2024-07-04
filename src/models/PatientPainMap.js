import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('PatientPainMap', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    painDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pain_duration',
        key: 'id'
      },
      field: 'pain_duration'
    },
    painScale: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pain_scale',
        key: 'id'
      },
      field: 'pain_scale'
    },
    painType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pain_type',
        key: 'id'
      },
      field: 'pain_type'
    },
    painAreas:{
      type:DataTypes.ARRAY[DataTypes.STRING],
      allowNull: true,
      field:'pain_areas' //
    },

    // painArea: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'cat_pain_areas',
    //     key: 'id'
    //   },
    //   field: 'pain_area'
    // },
    painFrequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pain_frequency',
        key: 'id'
      },
      field: 'pain_frequency'
    },
    // painNotes: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   field: 'pain_notes'
    // },
    isTakingAnalgesic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_taking_analgesic'
    },
    doesAnalgesicWorks: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'does_analgesic_works'
    },
    isWorstPainEver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_worst_pain_ever'
    },
    painOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'pain_owner'
    },
    painRecorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'pain_recorder'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    scheduling: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'appointment_scheduling',
        key: 'id'
      }
    },
    medicalEvent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medical_event',
        key: 'id'
      },
      field: 'medical_event'
    }
  }, {
    sequelize,
    tableName: 'patient_pain_map',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "patient_pain_map_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model

