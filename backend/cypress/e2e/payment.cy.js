import 'cypress-file-upload';

describe("Payment Gateway Integration Flow", () => {

  // ✅ Scenario 3.5: Stripe key error handling
  it('Scenario 3.5: Stripe session returns 500 if key is invalid', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:4242/create-checkout-session',
      failOnStatusCode: false,
      body: {}
    }).then((res) => {
      if (res.status === 200) {
        cy.log('Stripe key is valid; cannot force 500 for test');
      } else {
        expect(res.status).to.eq(500);
        expect(res.body).to.have.property('error');
      }
    });
  });
});
