import request from "supertest";
import app from "../app.js"
import mongoose from "mongoose";
const { DB_CHAT, TOKEN } = process.env;

describe("Protected Route Tests", () => {

  test("should return 200 for authorized request", async () => {
    const response = await request(app)
      .get("/api/getAllSchedule")
      .set("token", `${TOKEN}`)
      .expect(200);

    // Verifica la respuesta
    expect(response.statusCode).toBe(200)
  })
});
