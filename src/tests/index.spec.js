import { sequelize } from "../databaseConfig.js";
import { expect } from "@jest/globals";

const modelos = sequelize.models;
describe("TEST DATABASE", () => {
  // Test database connection
  describe("Test database connection", () => {
    it("should connect to the database", async () => {
      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
    });

    // Test models
    describe("Models test", () => {
      Object.keys(modelos).forEach((model) => {
        it(`should test the ${model} model`, () => {
          expect(modelos[model].name).toEqual(model);
        });
      });
    });
  });
});
