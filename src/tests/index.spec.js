import pg from "pg";
const { TOKEN, URL_API, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
import models from "../databaseConfig";

describe("Postgres DataBase Connection", () => {
  let client;
  beforeAll(async () => {
    client = new pg.Client({
      user: `${DB_USER}`,
      host: `${DB_HOST}`,
      database: `${DB_NAME}`,
      password: `${DB_PASSWORD}`,
      port: 5432,
    });
    await client.connect();
  }); // Establecer conexión
  test("should connect to the test database successfully", async () => {
    const res = await client.query("SELECT 1"); // Consulta sencilla para verificar la conexión
    expect(res.rows[0]).toEqual({ "?column?": 1 });
  });

  test("should return the list of user", async () => {
    const res = await client.query("SELECT * FROM user");
    expect(res.rows).toBeInstanceOf(Array);
  });

  describe("Model test", () => {
    Object.keys(models).forEach((model) => {
      test(`should return the list of ${model}`, async () => {
        expect(models[model].name).toEqual(model);
      });
    });
  });

  afterAll(() => {
    client.end();
  });
});
