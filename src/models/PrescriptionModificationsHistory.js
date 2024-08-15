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
      medicationPrescriptionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "medication_prescription_id",
        references: {
          model: "medication_prescription",
          key: "id",
        },
      },
      modificationTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "modification_timestamp",
      },
      medicalEventId: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      indications: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      doseMeasure: {
        type: DataTypes.ENUM("1", "1/2", "1/3", "1/4", "1/8", "0.5"),
        allowNull: false,
        field: "dose_measure",
      },
      timeMeasure: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: "time_measure",
      },
      timeMeasureType: {
        type: DataTypes.ENUM("Hs", "Min"),
        allowNull: false,
        field: "time_measure_type",
      },
      drugDetailPresentationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "drug_detail_presentation_id",
        references: {
          model: "drug_detail_presentation",
          key: "id",
        },
      },
      commercialNameDrugId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "commercial_name_drug_id",
        references: {
          model: "cat_commercial_name_drug",
          key: "id",
        },
      },
    },
    {
      tableName: "prescription_modifications_history",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "prescription_modifications_history_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
