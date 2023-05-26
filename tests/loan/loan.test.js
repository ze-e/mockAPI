const Loan = require("../../models/Loan.model");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");

chai.should();
chai.use(chaiHttp);

  describe("/GET loans", () => {
    it("should get all loans", (done) => {
      let loan = new Loan();
        loan.save().then((loan, err) => {
          chai
            .request(app)
            .get("/")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a("array");
              done();
            });
        });
    });
  });

  describe("/POST loan", () => {
    it("should POST a loan without borrowers", (done) => {
      chai
        .request(app)
        .post("/loan")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST loan", () => {
    it("should POST a loan with borrowers", (done) => {
      let loan = {
          borrowers:[{firstName: "new",lastName: "new",phone:"1-555-5555"}]
      };
      chai
        .request(app)
        .post("/loan")
        .send(loan)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET/loan/:id loan", () => {
    it("should GET a loan by the id", (done) => {
      let loan = new Loan({
          borrowers:[{firstName: "new",lastName: "new",phone:"1-555-5555"}]
      });
      loan.save().then((loan, err) => {
        chai
          .request(app)
          .get("/loan/" + loan.loanId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            done();
          });
      });
    });
  });

  describe("/GET/loan/:id loan", () => {
    it("should fail to GET a loan by the id", (done) => {
      let loan = new Loan({
          borrowers:[{firstName: "new",lastName: "new",phone:"1-555-5555"}]
      });
      loan.save().then((loan, err) => {
        chai
          .request(app)
          .get("/loan/")
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe("/PATCH/loan/:id/borrower loan", () => {
    it("should UPDATE a loan with a borrower", (done) => {
      let loan = new Loan({
          borrowers:[{firstName: "new", lastName: "new", phone:"1-555-5555"}]
      });
      loan.save().then((loan, err) => {
        const pairId = loan.borrowers[0].pairId.toString()

        chai
          .request(app)
          .patch("/loan/" + loan.loanId +'/borrower')
          .send({
              borrowerData: { firstName: "new name" },
              pairId: pairId,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            done();
          });
      });
    });
  });

  describe("/DELETE/loan/:id/borrower/:pairId loan", () => {
    it("should DELETE a borrower", (done) => {
      let loan = new Loan({
        borrowers: [{ firstName: "new", lastName: "new", phone: "1-555-5555" }],
      });
      loan.save().then((loan, err) => {
        const pairId = loan.borrowers[0].pairId.toString();
        chai
          .request(app)
          .delete("/loan/" + loan.loanId + "/borrower/" + pairId)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
    it("should NOT DELETE a borrower", (done) => {
      let loan = new Loan({
        borrowers: [{ firstName: "new", lastName: "new", phone: "1-555-5555" }],
      });
      loan.save().then((loan, err) => {
        const pairId = loan.borrowers[0].pairId.toString();
        chai
          .request(app)
          .delete("/loan/" + loan.loanId + "/borrower/" + "invalidId")
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });
    });
  });