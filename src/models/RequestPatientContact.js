import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define("RequestPatientContact", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique:"request_patient_contact_pk"
    },
    requestingUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'requesting_user_id',
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    resolved:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    creationTimeStamp:{
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
  }, {
        tableName: 'request_patient_contact',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
              name: "request_patient_contact_pk",
              unique: true,
              fields: [
                  {name: "id"},
              ]
          },
      ]
      });
};
export default model;
