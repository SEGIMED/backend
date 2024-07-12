import request from "supertest";
import { app, server } from "../index.js";

describe("Protected Route Tests", () => {
  const { TOKEN } = process.env; // Token;

  afterAll((done) => {
    server.close(done)
  });

  test("should return 200 for authorized request", async () => {
    const response = await request(app)
      .get("/api/getAllSchedule")
      .set("token", `${TOKEN}`)
      .expect(200);

    // Verifica la respuesta
    expect(response.statusCode).toBe(200);
  });
});
