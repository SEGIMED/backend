import request from "supertest";
import app from "../app.js";

describe("Protected Route Tests", () => {
  const { TOKEN } = process.env; // Token;
  test("should return 200 for authorized request", async () => {
    const response = await request(app)
      .get("http://localhost:5000/api/user/getAllUsers")
      .set("token", TOKEN)
      .send();

    // Verifica la respuesta
    expect(response.statusCode).toBe(200);
  });
});
