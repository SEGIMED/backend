import request from "supertest";
import app from "../../app.js"
const { TOKEN, URL_API } = process.env;

describe("Protected Route Tests", () => {

    test("should return 200 for authorized request", async () => {
      const response = await request(app)
        .get(`${URL_API}/getAllSchedule`)
        .set("token", `${TOKEN}`)
        .expect(200);
        // Verifica la respuesta
      expect(response.statusCode).toBe(200)
    });
  
    test("should return 200 for authorized request", async () => {
      const response = await request(app)
        .delete(`${URL_API}/deleteSchedule/3`)
        .set("token", `${TOKEN}`)
        .expect(200);
        // Verifica la respuesta
      expect(response.statusCode).toBe(200)
    });
  
    test("should respond with status 200 for valid values", async () => {
  
      // creamos un objeto de los valores
      const userData = {
        openAtt: "08:00:00",
        closeAtt: "15:00:00"
      }
      const response = await request(app)
        .post(`${URL_API}/create_schedule/3`)
        .send(userData)
        .set("token", `${TOKEN}`)
        .expect(200);
        // Verifica la respuesta
      expect(response.statusCode).toBe(200)
    });
  
    test('should return 200 and Array object for authorized request', async () => {
      const response = await request(app).get(`${URL_API}/getSchedule/3`)
      .set("token", `${TOKEN}`)
      .expect(200);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array)
    });
  });
  