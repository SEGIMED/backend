import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define('PatientSurgicalRisk', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    risk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cat_surgical_risk',
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
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'patient_surgical_risk',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "patient_surgical_risk_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

export default model

