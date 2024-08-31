import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
  sequelize.define(
    "AlarmEvent",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: "alarm_event_id_pk",
      },
      patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      alarmDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500],
        },
        field: "alarm_description",
      },
      questionsPriority: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        field: "questions_priority",
        validate: {
          max: 21,
          min: 0,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      solved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      solvedDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "solved_date",
      },
      ia_priority: {
        type: DataTypes.ENUM("Alta", "Media", "Baja"),
        allowNull: true,
      },
      physician_priority: {
        type: DataTypes.ENUM("Alta", "Media", "Baja"),
        allowNull: true,
      },
      ia_evaluation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      chat_history: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      tableName: "alarm_event",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "alarm_event_id_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

export default model;
