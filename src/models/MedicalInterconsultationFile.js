import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "MedicalInterconsultationFile",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: "file_interconsultation_pk",
      },
      medicalInterconsultationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "medical_interconsultation_id",
        references: {
          model: "medical_interconsultation",
          key: "id",
        },
      },
      fileName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "file_name",
      },
      fileURL: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "file_url",
      },
    },
    {
      tableName: "files_medical_interconsultation",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "file_interconsultation_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "idx_medical_interconsultation_id",
          fields: [{ name: "medical_interconsultation_id" }],
        },
      ],
    }
  );
};

export default model;
