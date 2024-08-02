import pg from "pg";
const { TOKEN, URL_API, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

describe("Postgres DataBase Connection", () => {
  let client;
  beforeAll(async () => {
    client = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "",
      port: 5432,
    });
    await client.connect();
  }); // Establecer conexión
  test("should connect to the test database successfully", async () => {
    const res = await client.query("SELECT 1"); // Consulta sencilla para verificar la conexión
    expect(res.rows[0]).toEqual({ "?column?": 1 });
  });
  afterAll(() => {
    client.end();
  });
});
