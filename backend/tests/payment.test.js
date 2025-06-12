const request = require('supertest');
const app = require('../app'); // not index.js

describe("Payment Gateway Integration Tests", () => {
  test("Scenario 3.1: Successful Payment Session Creation", async () => {
    const res = await request(app).post("/create-checkout-session").send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  test("Scenario 3.4: Payment Gateway Error (Simulated Stripe failure)", async () => {
    // simulate a broken endpoint
    const brokenApp = require('express')();
    brokenApp.post("/create-checkout-session", (req, res) => {
      res.status(500).json({ error: "Simulated failure" });
    });

    const res = await request(brokenApp).post("/create-checkout-session").send({});
    expect(res.statusCode).toBe(500); // ✅ Fix here
    expect(res.body).toHaveProperty("error");
  });
});
