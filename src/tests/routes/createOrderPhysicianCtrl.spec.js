import request from "supertest";
import app from "../../app.js";
import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";
import contextService from "request-context";

jest.mock("../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js");

describe("createOrderPhysicianCtrl", () => {
    test("should return 201 and the new order", async () => {
        const userId = "user123";
        const body = {
            // Add your test data here
        };
        const newOrder = {
            // Add your expected new order data here
        };

        contextService.set("request:user", { userId });

        createNewOrderHandler.mockResolvedValue(newOrder);

        const response = await request(app)
            .post("/your-route-here")
            .send(body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(newOrder);
    });

    test("should return an error status code and message", async () => {
        const userId = "user123";
        const body = {
            // Add your test data here
        };
        const error = {
            statusCode: 500,
            message: "Internal Server Error",
        };

        contextService.set("request:user", { userId });

        createNewOrderHandler.mockRejectedValue(error);

        const response = await request(app)
            .post("/your-route-here")
            .send(body);

        expect(response.statusCode).toBe(error.statusCode);
        expect(response.body).toEqual(error.message);
    });
});