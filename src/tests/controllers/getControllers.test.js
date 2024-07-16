import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import createSchedule from "../../controllers/managementSchedule/createAttention.js";

jest.unstable_mockModule("../../utils/modelTest/UserModelTest.js", () => {
  return {
    DoctorSchedule: {
      create: jest.fn(),
      // Otros métodos mockeados si es necesario
    },
  };
});
const { DoctorSchedule } = await import(
  "../../utils/modelTest/UserModelTest.js"
);

describe("GET / Controllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should mock DoctorSchedule.create method", () => {
    expect(jest.isMockFunction(DoctorSchedule.create)).toBe(true);
  });

  test("should respond with status 200 for valid values", async () => {
    DoctorSchedule.create.mockResolvedValue({
      doctor_id: 3,
      openAtt: "08:00:00",
      closeAtt: "15:00:00",
    });
    // creamos un objeto de los valores
    const req = {
      params: { idUser: 3 },
      body: {
        openAtt: "08:00:00",
        closeAtt: "15:00:00",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSchedule(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Registro con exito" });
  });
});
