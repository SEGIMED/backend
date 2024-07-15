import request from "supertest";
import app from "../../app.js"
const { TOKEN, URL_API } = process.env;
import { jest } from "@jest/globals";
import createSchedule from "../../controllers/managementSchedule/createAttention.js";

jest.unstable_mockModule("../../utils/modelTest/UserModelTest.js", () => {
  return {
    DoctorSchedule: {
      create: jest.fn(),
      // Otros métodos mockeados si es necesario
    }
  };
});
const { DoctorSchedule } = await import("../../utils/modelTest/UserModelTest.js")



describe("Protected Route Tests", () => {
  describe("POST / request", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
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

    test("should respond with status 200 for valid values", async () => {

      DoctorSchedule.create.mockResolvedValue({
        openAtt: "08:00:00",
        closeAtt: "15:00:00",
      })
      // creamos un objeto de los valores
      const req = {
        params: {idUser: 3},
        body: {
          openAtt: "08:00:00",
          closeAtt: "15:00:00",
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

  await createSchedule(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
    });
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
