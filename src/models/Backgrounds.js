import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('Backgrounds', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    surgicalBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'surgical_background'
    },
    pathologicBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pathologic_background'
    },
    nonPathologicBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'non_pathologic_background'
    },
    familyBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'family_background'
    },
    pediatricBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pediatric_background '
    },
    pharmacologicalBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pharmacological_background'
    },
    vaccinationBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'vaccination_background'
    },
    allergicBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'allergic_background'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    medicalEvent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medical_event',
        key: 'id'
      },
      unique: "medical_event_uk",
      field: 'medical_event'
    },
    patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'backgrounds',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "backgrounds_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "medical_event_uk",
        unique: true,
        fields: [
          { name: "medical_event" },
        ]
      },
    ]
  });
};

export default model

