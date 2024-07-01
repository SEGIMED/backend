import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('AnthropometricDetails', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        patient: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        measure: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        measureDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'measure_date'
        },
        measureSource: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'measure_source'
        },
        measureType: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'cat_anthropometric_measure_type',
                key: 'id'
            },
            field: 'measure_type'
        }
    }, {
        tableName: 'anthropometric_details',
        schema: 'public',
        timestamps: false
    });
};

export default model
