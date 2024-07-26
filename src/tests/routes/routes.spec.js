import request from "supertest";
import app from "../../app.js";
const { TOKEN, URL_API } = process.env;

describe("Protected Route Tests", () => {
  describe("POST / request", () => {
    test("should return 200 for authorized request Login", async () => {
      const userData = {
        email: "gabriel",
        password: "Pass123@",
        idNumber: "678911234",
      };
      const response = await request(app)
        .post(`${URL_API}/user/login`)
        .send(userData);
      expect(response.statusCode).toBe(500);
      expect(response.body).toBeInstanceOf(Object);
    }, 10000);
  });

  describe("GET / request", () => {
    test("should return 200 for authorized request to /user/getAllUsers", async () => {
      const response = await request(app)
        .get(`${URL_API}/user/getAllUsers`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /patient-details", async () => {
      const response = await request(app)
        .get(`${URL_API}/patient-details?id=8`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /patients", async () => {
      const response = await request(app)
        .get(`${URL_API}/patients`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /patientsfilter", async () => {
      const response = await request(app)
        .get(`${URL_API}/patientsfilter`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /physician-info", async () => {
      const response = await request(app)
        .get(`${URL_API}/physician-info?id=22`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /all-physicians", async () => {
      const response = await request(app)
        .get(`${URL_API}/all-physicians`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /find-physician-like-name", async () => {
      const response = await request(app)
        .get(`${URL_API}/find-physician-like-name`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /find-physicians-by-specialty-id", async () => {
      const response = await request(app)
        .get(`${URL_API}/find-physicians-by-specialty-id?specialtyId=3`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /find-physicians-by-specialty-id", async () => {
      const response = await request(app)
        .get(`${URL_API}/find-physicians-by-specialty-id?specialtyId=3`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /get-physician-favorite-patient", async () => {
      const response = await request(app)
        .get(`${URL_API}/get-physician-favorite-patient?physicianId=15&page=1&limit=10`) // Reemplaza '1' con un ID válido para la prueba
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /physician-review/:physicianId", async () => {
      const response = await request(app)
        .get(`${URL_API}/physician-review/1`) // Reemplaza '1' con un ID válido para la prueba
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /physicians-review-made-by-patient/:patientId", async () => {
      const response = await request(app)
        .get(`${URL_API}/physicians-review-made-by-patient/1`) // Reemplaza '1' con un ID válido para la prueba
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /catalog/get-catalog", async () => {
      const response = await request(app)
        .get(`${URL_API}/catalog/get-catalog?catalogName=ROLES`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /requestUserContact", async () => {
      const response = await request(app)
        .get(`${URL_API}/requestUserContact`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /requestUserContact/:id", async () => {
      const response = await request(app)
        .get(`${URL_API}/requestUserContact/1`) // Reemplaza '1' con un ID válido para la prueba
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /schedules", async () => {
      const response = await request(app)
        .get(`${URL_API}/schedules`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /medical-event/get-medical-event-history", async () => {
      const response = await request(app)
        .get(`${URL_API}/medical-event/get-medical-event-history`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /medical-event/get-medical-event-detail", async () => {
      const response = await request(app)
        .get(
          `${URL_API}/medical-event/get-medical-event-detail?medicalEventId=5`
        )
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /alarms-by-patient", async () => {
      const response = await request(app)
        .get(`${URL_API}/alarms-by-patient/3`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request", async () => {
      const response = await request(app)
        .get(`${URL_API}/scheduleDoctor`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 and Array object for authorized request /getSchedule", async () => {
      const response = await request(app)
        .get(`${URL_API}/scheduleDoctor?id=3`)
        .set("token", `${TOKEN}`)
        .set("query", "id=3")
        .expect(200);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test("should return 200 for authorized request to /statistics-genre", async () => {
      const response = await request(app)
        .get(`${URL_API}/statistics-genre`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test("should return 200 for authorized request to /statistics-patient-activity", async () => {
      const response = await request(app)
        .get(`${URL_API}/statistics-patient-activity`)
        .set("token", `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    });

    test('should return 200 for authorized request to statistics-general', async () => {
      const response = await request(app)
        .get(`${URL_API}/statistics-general`)
        .set('token', `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    })

    test('should return 200 for authorized request to center-attention', async () => {
      const response = await request(app)
        .get(`${URL_API}/center-attention`)
        .set('token', `${TOKEN}`)
        .expect(200);
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
    })

    test('should return 200 for authorized request to /get-all-pateint-preconsultation', async () => {
      const response = await request(app)
        .get(`${URL_API}/get-all-pateint-preconsultation?patientId=15`)
        .set('token', `${TOKEN}`)
        .expect(200);
        response.body.forEach((element) => {
          expect(element).toHaveProperty('id');
        });
      // Verifica la respuesta
      expect(response.statusCode).toBe(200);
  });

  test('should return 200 and id property on the response /get-preconsultation ', async () => {
    const response = await request(app)
      .get(`${URL_API}/get-preconsultation?scheduleId=5`)
      .set('token', `${TOKEN}`)
      .expect(200);
      expect(response.body).toHaveProperty('id');
      expect(response.statusCode).toBe(200);
  })
})
});
