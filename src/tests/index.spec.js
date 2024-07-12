import request from "supertest";
import { server } from "../index.js";
import app from "../app.js"
import mongoose from "mongoose";
const { DB_CHAT, TOKEN } = process.env;


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

describe("Protected Route Tests", (done) => {

  test("should return 200 for authorized request", async () => {
    const response = await request(app)
      .get("/getAllSchedule")
      .set("token", `${TOKEN}`)
      .expect(200);

    // Verifica la respuesta
    expect(response.statusCode).toBe(200)
    done();
  })
});
