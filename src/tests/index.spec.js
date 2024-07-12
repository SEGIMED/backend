import request from "supertest";
import { server } from "../index.js";
import app from "../app.js"
import mongoose from "mongoose";
const { DB_CHAT } = process.env;


beforeAll(async () => {
  await mongoose.connect(`${DB_CHAT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Mongo Atlas Database connection successful');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Protected Route Tests", () => {
  const { TOKEN } = process.env; // Token;

  afterAll((done) => {
    server.close(done)
  });

  test("should return 200 for authorized request", async () => {
    const response = await request(app)
      .get("/api/getAllSchedule")
      .set("token", `${TOKEN}`)
      .expect(200);

    // Verifica la respuesta
    expect(response.statusCode).toBe(200);
  });

  // test('should shoud return 200 for route login', async (done) => {
  //   const response = await request(app)
  //   .post("/user/login")
  //   .expect(200)
  //   .end((err, res) => {
  //     if (err) {
  //       return done(err)
  //     }
  //     return done();
  //   })
  //   expect(response.status).toBe(200);
  // })
});
