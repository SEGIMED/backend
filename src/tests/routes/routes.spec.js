import request from "supertest";
import app from "../../app.js";
const { TOKEN, URL_API } = process.env;

describe("Protected Route Tests", () => {
  describe("POST / request", () => {
    test("should return 200 for authorized request Login", async () => {
      const userData = {
        email: "mgabriela9401@gmail.com",
        password: "Pass123@",
        idNumber: "678911234",
      };
      const response = await request(app)
        .post(`${URL_API}/user/login`)
        .send(userData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    }, 10000);
  });

  describe("GET / request", () => {
    test("should return 200 for authorized request", async () => {
      const response = await request(app)
        .get(`${URL_API}/getAllSchedule`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 and Array object for authorized request", async () => {
      const response = await request(app)
        .get(`${URL_API}/getSchedule/3`)
        .set("token", `${TOKEN}`)
        .expect(200);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("DELETE / request", () => {
    test("should return 200 for authorized request", async () => {
      const response = await request(app)
        .delete(`${URL_API}/deleteSchedule/3`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });
  });
});
