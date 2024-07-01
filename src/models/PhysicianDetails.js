import sequelize from "sequelize";

const DataTypes = sequelize.DataTypes;

const model = (sequelize) => {
    sequelize.define('PhysicianDetails', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        reviewsScore: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'reviews_score'
        },
        physician: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: "physician_details_physician_uk"
        },
        numberOfReviews: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'number_of_reviews'
        },
        expertiseLevel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'cat_physician_expertise_level',
                key: 'id'
            },
            field: 'expertise_level'
        },
        favoritePatients: {
            type: DataTypes.ARRAY(DataTypes.NUMBER),
            allowNull: true,
            field:'favorite_patients'
        }
    }, {
        tableName: 'physician_details',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "physician_details_physician_uk",
                unique: true,
                fields: [
                    { name: "physician" },
                ]
            },
            {
                name: "physician_details_pk",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};

export default model;
