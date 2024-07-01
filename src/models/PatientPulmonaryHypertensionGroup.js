import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('PatientPulmonaryHypertensionGroup', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_pulmonary_hypertension_group',
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
    physician: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'patient_pulmonary_hypertension_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "patient_hp_group_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model
