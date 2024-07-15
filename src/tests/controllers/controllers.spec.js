// import request from "supertest";
// import { DoctorSchedule } from "../../databaseConfig.js";
// import app from "../../app.js";
// import moment from "moment";
// import { jest } from "@jest/globals";

// jest.mock("../../databaseConfig.js", () => ({
//   DoctorSchedule: {
//     findOne: jest.fn(),
//     create: jest.fn(),
//   },
// }));

// describe("Schedule Controller", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
//   });

//   test("should create a schedule and return 200 status", async () => {
//     const userData = {
//       openAtt: "08:00:00",
//       closeAtt: "15:00:00",
//     };

//     const mockUser = {
//       doctor_id: 3,
//       start_time: moment(userData.openAtt, "HH:mm:ss").format("HH:mm:ss"),
//       end_time: moment(userData.closeAtt, "HH:mm:ss").format("HH:mm:ss"),
//     };

//     // Mockear la función create para resolver con mockUser
//     DoctorSchedule.create.mockResolvedValue(mockUser);

//     // Ejecutar la solicitud POST usando supertest
//     const response = await request(app)
//       .post(`/api/create_schedule/3`)
//       .send(userData)
//       .set("token", `${TOKEN}`); // Asegúrate de definir TOKEN

//     // Verificar que la respuesta tenga un estado 200
//     expect(response.status).toBe(200);
//   });
// });
