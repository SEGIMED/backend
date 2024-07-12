import { Client} from "pg";
const { TOKEN, URL_API, DB_USER, DB_PASSWORD,  DB_HOST, DB_NAME, } = process.env;

describe("Postgres DataBase Connection", () => {
  let client
  beforeAll(() => {
    client = new Client({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: 5000,
    })
    client.connect()
   }); // Establecer conexión
    test('should connect to the test database successfully', async () => { 
      
      const res = await client.query('SELECT 1'); // Consulta sencilla para verificar la conexión
      expect(res.rows[0]).toEqual({ '?column?': 1 });
    });
    afterAll(() => {
      client.end();
    });
});