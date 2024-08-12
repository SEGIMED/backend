import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "PrescriptionMofidicationsHistory",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      medicationPrescriptionId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        field:"prescription_id",
        references: {
            model: "medication_prescription",
            key:"id"
        }
      },
      modificationTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      medicalEventId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "medical_event_id",
        references: {
          model: "medical_event",
          key: "id",
        },
      },
      physicianId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "physician_id",
        references: {
          model: "user",
        },
      },
      observations: {
        type:DataTypes.TEXT,
        allowNull:true,
      },
      indications: {
        type:DataTypes.TEXT,
        allowNull:true,
      },
      doseMeasure:{
        type:DataTypes.ENUM('1','1/2','1/3','1/4','1/8','0.5'),
        allowNull:false
      },
      timeMeasure:{
        type: DataTypes.NUMBER,
        allowNull:false
      },
      timeMeasureType:{
        type: DataTypes.ENUM('Hs','Min'),
        allowNull:false
      },
      drugDetailPresentationId:{
        type: DataTypes.BIGINT,
        allowNull:false,
        field: "drug_detail_presentation_id",
        references:{
            model: "drug_detail_presentation",
            key: "id"
        }
      }
    },
    {
      tableName: "prescription",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "prescription_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
