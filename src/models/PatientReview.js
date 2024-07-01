import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PatientReview",{
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: "patient_review_id_key"
      },
      reviewScore: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true,
        field: "review_score",
        validate:{
          max:5,
          min:1
        }
      },
      physicianId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        field: "physician_id",
      },
      patientId:{
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        field: "patient_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false,
      },
      comments:{
        type:DataTypes.STRING,
        validate:{
          len:[0,300]
        }
      }
    },
    {
      tableName: "patient_review",
      schema: "public",
      timestamps: false,
      indexes: [
        {
            name: "patient_review_id_key",
            unique: true,
            fields: [
                {name: "id"},
            ]
        },
    ]
    });
};

export default model;

