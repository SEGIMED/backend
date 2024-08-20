import request from "supertest";
import app from "../../app.js";
import { createOnbPhysician } from "../../handlers/onbording/createOnbPhysician.js";

const userId = 1;
describe("createOnbPhysician", () => {
  test("should create a new physician onboarding", async () => {
    const body = {
      genre: 1,
      birthDate: "1990-01-01",
      address: "123 Main St",
      centerAttention: [1, 2, 3],
      specialty: 1,
      nacionalRegistration: "123456",
      provincialRegistration: "ABC123",
    };

    const response = await createOnbPhysician(body, userId);

    expect(response.newOnbPhysician).toBeDefined();
    expect(response.newMedicalRegistryNacional).toBeDefined();
    expect(response.newMedicalRegistryProvincial).toBeDefined();
    expect(response.newSpecialty).toBeDefined();
    expect(response.attendentPlaceRegister).toBeDefined();
  });

  test("should throw an error if no center of attention is selected", async () => {
    const body = {
      genre: 1,
      birthDate: "1990-01-01",
      address: "123 Main St",
      centerAttention: [],
      specialty: 1,
      nacionalRegistration: "123456",
      provincialRegistration: "ABC123",
    };

    await expect(createOnbPhysician(body, userId)).rejects.toThrowError(
      "Debe seleccionar al menos un centro de atención"
    );
  });
});
