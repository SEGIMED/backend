import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  sequelize.define('PatientPulmonaryHypertensionGroupMapping', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pulmonary_hypertension_group',
        key: 'id'
      },
      field:'group_id'
    },
    patientGroupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'PatientPulmonaryHypertensionGroup',
        key: 'id'
      },
      field:'patient_group_id'
    }
  }, {
    tableName: 'patient_pulmonary_hypertension_group_mapping',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "patient_hp_group_mapping_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model;
